using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public class DeleteExpiringProductHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator) : IRequestHandler<DeleteExpiringProductCommand, MediatrResponseDto<WriteOffResponseDto>>
{
    public async Task<MediatrResponseDto<WriteOffResponseDto>> Handle(DeleteExpiringProductCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var user = await context.Users.FindAsync([request.UserId], cancellationToken);

            if (user is null)
                return MediatrResponseDto<WriteOffResponseDto>.NotFound("User not found");

            var expiringProducts = await context.ProductsInventory
                .Where(p => request.Ids.Contains(p.Id))
                .Include(p => p.Product)
                .ToListAsync(cancellationToken);

            if (expiringProducts is null)
                return MediatrResponseDto<WriteOffResponseDto>.NotFound("Expired products listed were not found");

            var transactionDate = DateTime.Now;

            var checkRowGuid = Guid.NewGuid();
            var checkRows = new List<CheckRow>();
            var totalPrice = 0m;

            var statisticRows = new List<ProductsStatisticEntity>();

            foreach (var expiringProduct in expiringProducts)
            {
                var totalAmount = expiringProduct.PurchasePrice * expiringProduct.Quantity;
                var statistic = new ProductsStatisticEntity
                {
                    ProductId = expiringProduct.ProductId,
                    TransactionType = TransactionType.WriteOff,
                    Quantity = expiringProduct.Quantity,
                    Price = expiringProduct.PurchasePrice,
                    TotalAmount = totalAmount,
                    TransactionDate = transactionDate,
                    CheckId = checkRowGuid
                };

                statisticRows.Add(statistic);

                checkRows.Add(new CheckRow(expiringProduct.Product.Name, expiringProduct.Product.UnitOfMeasure, expiringProduct.Quantity, expiringProduct.PurchasePrice, expiringProduct.PricePerQuantity, totalAmount));

                totalPrice += totalAmount;

                context.ProductsInventory.Remove(expiringProduct);
            }

            await context.SaveChangesAsync(cancellationToken);

            var check = await checkGenerator.GenerateAndSaveCheckAsync(checkRowGuid, checkRows, totalPrice, transactionDate, TransactionType.WriteOff, user);

            await context.ProductsStatistic.AddRangeAsync(statisticRows, cancellationToken);

            await context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            return MediatrResponseDto<WriteOffResponseDto>.Success(new WriteOffResponseDto(check, totalPrice), $"{expiringProducts.Count} expired products is successfully deleted. {(request.Ids.Count() != expiringProducts.Count ? $"{request.Ids.Count() - expiringProducts.Count} expired products not founded" : string.Empty)}");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);

            Console.WriteLine(ex.Message);
            return MediatrResponseDto<WriteOffResponseDto>.Failure($"Error while deleting product: {ex.Message}");
        }
    }
}