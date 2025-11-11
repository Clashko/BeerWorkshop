using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Products.Update;

public class UpdateProductHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<UpdateProductCommand, MediatrResponseDto<ProductResponseDto>>
{
    public async Task<MediatrResponseDto<ProductResponseDto>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var product = await context.Products.FirstOrDefaultAsync(p => p.Id.Equals(request.Id), cancellationToken: cancellationToken);

            if (product is null)
                MediatrResponseDto<ProductResponseDto>.NotFound("Updatable product not founded");

            mapper.Map(request.Data, product);
            context.Entry(product!).State = EntityState.Modified;

            await context.SaveChangesAsync(cancellationToken);

            var result = mapper.Map<ProductResponseDto>(product);

            return MediatrResponseDto<ProductResponseDto>.Success(result, $"Product with id: {request.Id} is successfully updated");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<ProductResponseDto>.Failure($"Error while updating product: {ex.Message}");
        }
    }
}