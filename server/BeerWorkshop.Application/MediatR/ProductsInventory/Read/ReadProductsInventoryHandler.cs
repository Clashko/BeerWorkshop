using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
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
            var productsInventory = await context.Products.Include(p => p.Inventory).ToListAsync(cancellationToken);

            if (productsInventory == null || productsInventory.Count == 0)
                return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.NotFound("Products inventory empty");

            var result = mapper.Map<IEnumerable<ProductInventoryResponseDto>>(productsInventory);

            return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.Success(result, $"Founded inventory items: {productsInventory.Sum(pi => pi.Inventory.Count)}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<ProductInventoryResponseDto>>.Failure($"Error while reading products inventory: {ex.Message}");
        }
    }
}