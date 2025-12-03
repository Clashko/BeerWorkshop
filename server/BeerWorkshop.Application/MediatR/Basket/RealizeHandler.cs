using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Basket;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Devices;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Basket;

public class RealizeHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator) : IRequestHandler<RealizeCommand, MediatrResponseDto<RealizationResponseDto>>
{
    public async Task<MediatrResponseDto<RealizationResponseDto>> Handle(RealizeCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);

            if (user is null)
                return MediatrResponseDto<RealizationResponseDto>.NotFound("User not found");

            var transactionDate = DateTime.Now;

            var checkRowGuid = Guid.NewGuid();

            var checkRows = new List<CheckRow>();

            checkRows.AddRange(await ProcessProducts(request, transactionDate, checkRowGuid, cancellationToken));

            checkRows.AddRange(await ProcessDevices(request, transactionDate, checkRowGuid, cancellationToken));

            var totalPrice = checkRows.Sum(x => x.TotalAmount);

            var check = await checkGenerator.GenerateAndSaveCheckAsync(checkRowGuid, checkRows, totalPrice, transactionDate, TransactionType.Sale, user);

            await context.SaveChangesAsync(cancellationToken);

            var result = new RealizationResponseDto(check, totalPrice);

            await transaction.CommitAsync(cancellationToken);

            return MediatrResponseDto<RealizationResponseDto>.Success(result, "Sale completed successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            await transaction.RollbackAsync(cancellationToken);
            return MediatrResponseDto<RealizationResponseDto>.Failure($"Error in sale process: {ex.Message}");
        }
    }

    private async Task<List<CheckRow>> ProcessProducts(RealizeCommand request, DateTime transactionDate, Guid checkRowGuid, CancellationToken cancellationToken)
    {
        var result = new List<CheckRow>();

        var productsInventoryItems = await context.ProductsInventory
                .Where(p => request.Data.Products.Select(p => p.Id).Contains(p.Id))
                .Include(p => p.Product)
                .ToListAsync(cancellationToken);

        foreach (var product in request.Data.Products)
        {
            var productInventoryItem = productsInventoryItems.FirstOrDefault(p => p.Id.Equals(product.Id)) ?? throw new Exception($"Product inventory item with ID: {product.Id} not founded");

            if (productInventoryItem.Quantity < product.Quantity)
                throw new Exception($"Product inventory item with id:{productInventoryItem.Id} has less quantity than required");

            productInventoryItem.Quantity -= product.Quantity;

            var totalPrice = TotalAmountCalculator.CountTotalAmountWithDiscount(productInventoryItem.RetailPrice, product.Quantity, productInventoryItem.PricePerQuantity, request.Data.DiscountCalculatorType, product.DiscountPercent, request.Data.TotalDiscount);

            var statistic = new ProductsStatisticEntity
            {
                ProductId = productInventoryItem.ProductId,
                TransactionType = TransactionType.Sale,
                Quantity = product.Quantity,
                Price = productInventoryItem.RetailPrice,
                Discount = GenerateStatisticDiscountValue(BasketItemType.Device, request.Data.DiscountCalculatorType, product.DiscountPercent, request.Data.TotalDiscount),
                TotalAmount = totalPrice,
                TransactionDate = transactionDate,
                CheckId = checkRowGuid
            };
            context.ProductsStatistic.Add(statistic);

            if (productInventoryItem.Quantity <= 0)
            {
                context.ProductsInventory.Remove(productInventoryItem);
            }

            result.Add(new CheckRow(productInventoryItem.Product.ShortName, productInventoryItem.Product.UnitOfMeasure, product.Quantity, productInventoryItem.RetailPrice, productInventoryItem.PricePerQuantity, totalPrice, product.DiscountPercent));
        }

        return result;
    }

    private async Task<List<CheckRow>> ProcessDevices(RealizeCommand request, DateTime transactionDate, Guid checkRowGuid, CancellationToken cancellationToken)
    {
        var result = new List<CheckRow>();

        var devicesInventoryItems = await context.DevicesInventory
                .Where(p => request.Data.Devices.Select(p => p.Id).Contains(p.Id))
                .Include(p => p.Device)
                .ToListAsync(cancellationToken);

        foreach (var device in request.Data.Devices)
        {
            var deviceInventoryItem = devicesInventoryItems.FirstOrDefault(p => p.Id.Equals(device.Id)) ?? throw new Exception($"Device inventory item with ID: {device.Id} not founded");

            if (deviceInventoryItem.Quantity < device.Quantity)
                throw new Exception($"Product inventory item with id:{deviceInventoryItem.Id} has less quantity than required");

            deviceInventoryItem.Quantity -= device.Quantity;

            var totalPrice = TotalAmountCalculator.CountTotalAmountWithDiscount(deviceInventoryItem.RetailPrice, device.Quantity, 1, request.Data.DiscountCalculatorType, device.DiscountPercent, request.Data.TotalDiscount);

            var statistic = new DevicesStatisticEntity
            {
                DeviceId = deviceInventoryItem.DeviceId,
                TransactionType = TransactionType.Sale,
                Quantity = device.Quantity,
                Price = deviceInventoryItem.RetailPrice,
                Discount = GenerateStatisticDiscountValue(BasketItemType.Device, request.Data.DiscountCalculatorType, device.DiscountPercent, request.Data.TotalDiscount),
                TotalAmount = totalPrice,
                TransactionDate = transactionDate,
                CheckId = checkRowGuid
            };
            context.DevicesStatistic.Add(statistic);

            if (deviceInventoryItem.Quantity <= 0)
            {
                context.DevicesInventory.Remove(deviceInventoryItem);
            }

            result.Add(new CheckRow(deviceInventoryItem.Device.ShortName, UnitOfMeasure.Piece, device.Quantity, deviceInventoryItem.RetailPrice, 1, totalPrice, device.DiscountPercent));
        }

        return result;
    }

    private static string? GenerateStatisticDiscountValue(BasketItemType type, DiscountCalculatorType discountCalculatorType, int? discountPercent, int? totalDiscount)
    {
        return discountCalculatorType switch
        {
            DiscountCalculatorType.FullDiscount => GenerateStatisticFullDiscountValue(type, discountPercent, totalDiscount),
            DiscountCalculatorType.OnlyItemDiscount => GenerateStatisticOnlyItemDiscountValue(type, discountPercent),
            DiscountCalculatorType.OnlyTotalDiscount => GenerateStatisticOnlyTotalDiscountValue(type, totalDiscount),
            _ => throw new NotImplementedException(),
        };
    }

    private static string? GenerateStatisticFullDiscountValue(BasketItemType type, int? discountPercent, int? totalDiscount)
    {
        if (discountPercent is null && totalDiscount is null) return null;

        var result = string.Empty;

        if (discountPercent is not null)
            result += string.Format("{0} discount: {1}%", Enum.GetName(type), discountPercent.Value);

        if (totalDiscount is not null)
            result += string.Format("{0}Total discount: {1}%", string.IsNullOrEmpty(result) ? string.Empty : " + ", totalDiscount.Value);

        return result;
    }

    private static string? GenerateStatisticOnlyItemDiscountValue(BasketItemType type, int? discountPercent)
    {
        if (discountPercent is null) return null;

        return string.Format("{0} discount: {1}%", Enum.GetName(type), discountPercent.Value);
    }

    private static string? GenerateStatisticOnlyTotalDiscountValue(BasketItemType type, int? totalDiscount)
    {
        if (totalDiscount is null) return null;

        return string.Format("Total discount: {0}%", totalDiscount.Value);
    }
}