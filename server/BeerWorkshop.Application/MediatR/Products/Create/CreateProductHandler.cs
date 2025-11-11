using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Products;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Products.Create;

public class CreateProductHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<CreateProductCommand, MediatrResponseDto<ProductResponseDto>>
{
    public async Task<MediatrResponseDto<ProductResponseDto>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var product = mapper.Map<ProductEntity>(request.Data);

            context.Products.Add(product);

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<ProductResponseDto>(product);

            return MediatrResponseDto<ProductResponseDto>.Success(result, "Product successfully created");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<ProductResponseDto>.Failure($"Error while creating product: {ex.Message}");
        }
    }
}