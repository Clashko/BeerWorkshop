using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Delivery
{
    public class ProductsDeliveryHandler(BeerWorkshopContext context, ICheckGenerator checkGenerator, IMapper mapper) : IRequestHandler<ProductsDeliveryCommand, MediatrResponseDto<CreateProductsDeliveryResponseDto>>
    {
        public async Task<MediatrResponseDto<CreateProductsDeliveryResponseDto>> Handle(ProductsDeliveryCommand request, CancellationToken cancellationToken)
        {
            using var transaction = context.Database.BeginTransaction();
            try
            {
                var user = await context.Users.FindAsync([request.UserId], cancellationToken);

                if (user is null)
                    return MediatrResponseDto<CreateProductsDeliveryResponseDto>.NotFound("User not found");

                var result = new List<ProductInventoryResponseDto>();
                var totalAmount = 0m;
                var checkId = Guid.NewGuid();
                var transactionDate = DateTime.Now;

                var checkRows = new List<CheckRow>();
                var statistic = new List<ProductsStatisticEntity>();

                foreach (var delivery in request.Deliveries)
                {
                    var product = await context.Products.FindAsync([delivery.ProductId], cancellationToken);

                    if (product is null)
                    {
                        await transaction.RollbackAsync(cancellationToken);
                        return MediatrResponseDto<CreateProductsDeliveryResponseDto>.NotFound($"Product with id {delivery.ProductId} for new items delivery not founded");
                    }

                    var productItemsResult = new List<ProductInventoryItemResponseDto>();

                    foreach (var item in delivery.Items)
                    {
                        var inventoryItem = mapper.Map<ProductsInventoryEntity>(item);

                        context.ProductsInventory.Add(inventoryItem);

                        var itemTotalAmount = TotalAmountCalculator.CalculateTotalAmount(inventoryItem.PurchasePrice, inventoryItem.PricePerQuantity, inventoryItem.Quantity);

                        statistic.Add(new ProductsStatisticEntity
                        {
                            ProductId = inventoryItem.ProductId,
                            CheckId = checkId,
                            TransactionType = Database.Enums.TransactionType.Arrival,
                            Quantity = inventoryItem.Quantity,
                            TotalAmount = itemTotalAmount,
                            TransactionDate = transactionDate
                        });

                        totalAmount += itemTotalAmount;

                        checkRows.Add(new CheckRow(inventoryItem.Product.Name, inventoryItem.Product.UnitOfMeasure, inventoryItem.Quantity, inventoryItem.PricePerQuantity, inventoryItem.PurchasePrice, totalAmount));

                        productItemsResult.Add(mapper.Map<ProductInventoryItemResponseDto>(inventoryItem));
                    }

                    result.Add(new ProductInventoryResponseDto(mapper.Map<ProductResponseDto>(product), productItemsResult));
                }

                var check = await checkGenerator.GenerateAndSaveCheckAsync(checkId, checkRows, totalAmount, transactionDate, Database.Enums.TransactionType.Arrival, user);

                await context.ProductsStatistic.AddRangeAsync(statistic, cancellationToken);

                await context.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                return MediatrResponseDto<CreateProductsDeliveryResponseDto>.Success(new CreateProductsDeliveryResponseDto(result, check, totalAmount), "Products delivery successfully applyed");
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(cancellationToken);

                Console.WriteLine(ex.Message);
                return MediatrResponseDto<CreateProductsDeliveryResponseDto>.Failure($"Error in products delivery apply process: {ex.Message}");
            }
        }
    }
}