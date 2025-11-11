using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Create;

public class CreateProductInventoryItemHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<CreateProductInventoryItemCommand, MediatrResponseDto<ProductInventoryItemResponseDto>>
{
    public async Task<MediatrResponseDto<ProductInventoryItemResponseDto>> Handle(CreateProductInventoryItemCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var inventoryItem = mapper.Map<ProductsInventoryEntity>(request.Data);

            context.ProductsInventory.Add(inventoryItem);

            await context.SaveChangesAsync(cancellationToken);

            var statistic = new ProductsStatisticEntity
            {
                ProductId = request.Data.ProductId,
                TransactionType = Database.Enums.TransactionType.Arrival,
                Quantity = request.Data.Quantity,
                TotalAmount = request.Data.PurchasePrice * request.Data.Quantity,
                TransactionDate = DateTime.Now
            };

            context.ProductsStatistic.Add(statistic);

            await context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            var result = mapper.Map<ProductInventoryItemResponseDto>(inventoryItem);

            return MediatrResponseDto<ProductInventoryItemResponseDto>.Success(result, "Product inventory item successfully created");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);
            
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<ProductInventoryItemResponseDto>.Failure($"Error while creating inventory item: {ex.Message}");
        }
    }
}