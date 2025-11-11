using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public class DeleteExpiringProductHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator, IConfiguration configuration) : IRequestHandler<DeleteExpiringProductCommand, MediatrResponseDto<WriteOffResponseDto>>
{
    public async Task<MediatrResponseDto<WriteOffResponseDto>> Handle(DeleteExpiringProductCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var expiringProducts = await context.ProductsInventory
                .Where(p => request.Data.Ids.Contains(p.Id))
                .Include(p => p.Product)
                .ToListAsync(cancellationToken);

            if (expiringProducts is null)
                return MediatrResponseDto<WriteOffResponseDto>.NotFound("Expired products listed were not found");

            var transactionDate = DateTime.Now;

            var checkRowGuid = Guid.NewGuid();
            var checkRows = new List<CheckRow>();
            var totalPrice = 0m;

            foreach (var expiringProduct in expiringProducts)
            {
                var statistic = new ProductsStatisticEntity
                {
                    ProductId = expiringProduct.ProductId,
                    TransactionType = TransactionType.Sale,
                    Quantity = expiringProduct.Quantity,
                    Price = expiringProduct.PurchasePrice,
                    TotalAmount = expiringProduct.PurchasePrice * expiringProduct.Quantity,
                    TransactionDate = transactionDate,
                    CheckId = checkRowGuid
                };

                checkRows.Add(new CheckRow(expiringProduct.Product.Name, expiringProduct.Product.UnitOfMeasure, expiringProduct.Quantity, expiringProduct.PurchasePrice));

                totalPrice += expiringProduct.PurchasePrice * expiringProduct.Quantity;

                context.ProductsStatistic.Add(statistic);

                context.ProductsInventory.Remove(expiringProduct);
            }

            await context.SaveChangesAsync(cancellationToken);

            var check = await GenerateAndSaveCheck(request.Data.Cashier, checkRowGuid, checkRows, totalPrice, transactionDate);

            await transaction.CommitAsync(cancellationToken);

            return MediatrResponseDto<WriteOffResponseDto>.Success(new WriteOffResponseDto(check, totalPrice), $"{expiringProducts.Count} expired products is successfully deleted. {(request.Data.Ids.Count() != expiringProducts.Count ? $"{request.Data.Ids.Count() - expiringProducts.Count} expired products not founded" : string.Empty)}");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);

            Console.WriteLine(ex.Message);
            return MediatrResponseDto<WriteOffResponseDto>.Failure($"Error while deleting product: {ex.Message}");
        }
    }
    private async Task<string> GenerateAndSaveCheck(string cashier, Guid checkRowGuid, List<CheckRow> checkRows, decimal totalPrice, DateTime transactionDate)
    {
        var check = checkGenerator.GenerateCheck(new CheckModel(cashier, checkRows, totalPrice), TransactionType.Sale);

        var path = configuration.CreateCheckDirectoriesAndGeneratePath(check.OrderNumber, transactionDate);

        File.WriteAllText(path, check.CheckContent);

        context.Checks.Add(new CheckEntity()
        {
            Id = checkRowGuid,
            Path = path,
            TransactionDate = transactionDate,
            TotalAmount = totalPrice,
            TransactionType = TransactionType.WriteOff,
            OrderNumber = check.OrderNumber,
        });

        await context.SaveChangesAsync();

        return check.CheckContent;
    }
}