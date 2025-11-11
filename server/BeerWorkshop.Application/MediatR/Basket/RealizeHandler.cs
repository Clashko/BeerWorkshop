using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Basket;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities;
using BeerWorkshop.Database.Entities.Devices;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BeerWorkshop.Application.MediatR.Basket;

public class RealizeHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator, IConfiguration configuration) : IRequestHandler<RealizeCommand, MediatrResponseDto<RealizationResponseDto>>
{
    public async Task<MediatrResponseDto<RealizationResponseDto>> Handle(RealizeCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var transactionDate = DateTime.Now;

            var checkRowGuid = Guid.NewGuid();

            var checkRows = new List<CheckRow>();

            checkRows.AddRange(await ProcessProducts(request, transactionDate, checkRowGuid, cancellationToken));

            checkRows.AddRange(await ProcessDevices(request, transactionDate, checkRowGuid, cancellationToken));

            var totalPrice = checkRows.Sum(x => x.Price * x.Quantity);

            var check = await GenerateAndSaveCheck(request, checkRowGuid, checkRows, totalPrice, transactionDate);

            var result = new RealizationResponseDto(check, totalPrice);

            await transaction.CommitAsync(cancellationToken);

            return MediatrResponseDto<RealizationResponseDto>.Success(result, "Sale completed successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            await transaction.RollbackAsync();
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

            productInventoryItem.Quantity -= product.Quantity;

            var totalPrice = CountTotalPriceWithDiscount(productInventoryItem.RetailPrice, product.Quantity, request.Data.DiscountCalculatorType, product.DiscountPercent, request.Data.TotalDiscount);

            var statistic = new ProductsStatisticEntity
            {
                ProductId = productInventoryItem.ProductId,
                TransactionType = Database.Enums.TransactionType.Sale,
                Quantity = product.Quantity,
                Price = productInventoryItem.RetailPrice,
                Discount = GenerateStatisticDiscountValue(BasketItemType.Device, request.Data.DiscountCalculatorType, product.DiscountPercent, request.Data.TotalDiscount),
                TotalAmount = totalPrice,
                TransactionDate = transactionDate,
                CheckId = checkRowGuid
            };

            if (productInventoryItem.Quantity <= product.Quantity)
                context.ProductsInventory.Remove(productInventoryItem);

            context.ProductsStatistic.Add(statistic);

            await context.SaveChangesAsync(cancellationToken);

            result.Add(new CheckRow(productInventoryItem.Product.ShortName, productInventoryItem.Product.UnitOfMeasure, product.Quantity, productInventoryItem.RetailPrice, product.DiscountPercent));
        }

        return result;
    }

    private async Task<List<CheckRow>> ProcessDevices(RealizeCommand request, DateTime transactionDate, Guid checkRowGuid, CancellationToken cancellationToken)
    {
        var result = new List<CheckRow>();

        var devicesInventoryItems = await context.DevicesInventory
                .Where(p => request.Data.Devices.Select(p => p.Id).Contains(p.Id))
                .ToListAsync(cancellationToken);

        foreach (var device in request.Data.Devices)
        {
            var deviceInventoryItem = devicesInventoryItems.FirstOrDefault(p => p.Id.Equals(device.Id)) ?? throw new Exception($"Device inventory item with ID: {device.Id} not founded");

            deviceInventoryItem.Quantity -= device.Quantity;

            var totalPrice = CountTotalPriceWithDiscount(deviceInventoryItem.RetailPrice, device.Quantity, request.Data.DiscountCalculatorType, device.DiscountPercent, request.Data.TotalDiscount);

            var statistic = new DevicesStatisticEntity
            {
                DeviceId = deviceInventoryItem.DeviceId,
                TransactionType = Database.Enums.TransactionType.Sale,
                Quantity = device.Quantity,
                Price = deviceInventoryItem.RetailPrice,
                Discount = GenerateStatisticDiscountValue(BasketItemType.Device, request.Data.DiscountCalculatorType, device.DiscountPercent, request.Data.TotalDiscount),
                TotalAmount = totalPrice,
                TransactionDate = transactionDate,
                CheckId = checkRowGuid
            };

            context.DevicesStatistic.Add(statistic);

            await context.SaveChangesAsync(cancellationToken);

            result.Add(new CheckRow(deviceInventoryItem.Device.ShortName, Database.Enums.UnitOfMeasure.Piece, device.Quantity, deviceInventoryItem.RetailPrice, device.DiscountPercent));
        }

        return result;
    }

    private static decimal CountTotalPriceWithDiscount(decimal retailprice, decimal Quantity, DiscountCalculatorType discountCalculatorType, int? discountPercent, int? totalDiscount)
    {
        var price = retailprice * Quantity;

        return discountCalculatorType switch
        {
            DiscountCalculatorType.FullDiscount => CountTotalPriceWithFullDiscount(price, discountPercent, totalDiscount),
            DiscountCalculatorType.OnlyItemDiscount => CountOnlyItemTotalPriceWithOnlyItemDiscount(price, discountPercent),
            DiscountCalculatorType.OnlyTotalDiscount => CountTotalPriceWithOnlyTotalDiscount(price, totalDiscount),
            _ => throw new NotImplementedException(),
        };
    }

    private static decimal CountTotalPriceWithFullDiscount(decimal price, int? discountPercent, int? totalDiscount)
    {
        if (discountPercent is null && totalDiscount is null)
            return price;

        if (discountPercent is not null)
            price -= price * (discountPercent.Value / 100m);

        if (totalDiscount is not null)
            price -= price * (totalDiscount.Value / 100m);

        return price;
    }

    private static decimal CountOnlyItemTotalPriceWithOnlyItemDiscount(decimal price, int? discountPercent)
    {
        if (discountPercent is null)
            return price;

        if (discountPercent is not null)
            price -= price * (discountPercent.Value / 100m);

        return price;
    }

    private static decimal CountTotalPriceWithOnlyTotalDiscount(decimal price, int? totalDiscount)
    {
        if (totalDiscount is null)
            return price;

        if (totalDiscount is not null)
            price -= price * (totalDiscount.Value / 100m);

        return price;
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

    private async Task<string> GenerateAndSaveCheck(RealizeCommand request, Guid checkRowGuid, List<CheckRow> checkRows, decimal totalPrice, DateTime transactionDate)
    {
        var check = checkGenerator.GenerateCheck(new CheckModel(request.Data.Cashier, checkRows, totalPrice, request.Data.DiscountCalculatorType, request.Data.TotalDiscount), TransactionType.Sale);

        var path = configuration.CreateCheckDirectoriesAndGeneratePath(check.OrderNumber, transactionDate);

        File.WriteAllText(path, check.CheckContent);

        context.Checks.Add(new CheckEntity()
        {
            Id = checkRowGuid,
            Path = path,
            TransactionDate = transactionDate,
            TotalAmount = totalPrice,
            TransactionType = TransactionType.Sale,
            OrderNumber = check.OrderNumber,
        });

        await context.SaveChangesAsync();

        return check.CheckContent;
    }
}