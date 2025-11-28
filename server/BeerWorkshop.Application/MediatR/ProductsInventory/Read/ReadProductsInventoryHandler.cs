using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Application.Dto.Responses.ProductsInventory;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.ProductsInventory.Read;

public class ReadProductsInventoryHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadProductsInventoryQuery, MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>>
{
    public async Task<MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>> Handle(ReadProductsInventoryQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var productsInventoryGroups = await context.ProductsInventory.Include(p => p.Product).GroupBy(p => p.Product).ToListAsync(cancellationToken);

            if (productsInventoryGroups == null || productsInventoryGroups.Count == 0)
                return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.NotFound("Products inventory empty");

            var result = productsInventoryGroups.Select(g => new ProductInventoryResponseDto(
                Product: mapper.Map<ProductResponseDto>(g.Key),
                InventoryItems: mapper.Map<IEnumerable<ProductInventoryItemResponseDto>>(g)
            ));

            return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.Success(result, $"Founded inventory items: {result.Sum(r => r.InventoryItems.Count())}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.Failure($"Error while reading products inventory: {ex.Message}");
        }
    }
}