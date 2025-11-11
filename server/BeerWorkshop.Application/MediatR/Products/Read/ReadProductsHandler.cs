using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Products.Read;

public class ReadProductsHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadProductsQuery, MediatrResponseDto<IEnumerable<ProductResponseDto>>>
{
    public async Task<MediatrResponseDto<IEnumerable<ProductResponseDto>>> Handle(ReadProductsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var products = await context.Products.ToListAsync(cancellationToken);

            if (products == null || products.Count == 0)
                return MediatrResponseDto<IEnumerable<ProductResponseDto>>.NotFound("Products not founded");

            var result = mapper.Map<IEnumerable<ProductResponseDto>>(products);

            return MediatrResponseDto<IEnumerable<ProductResponseDto>>.Success(result, $"Founded products: {products.Count}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<ProductResponseDto>>.Failure($"Error while reading products: {ex.Message}");
        }
    }
}