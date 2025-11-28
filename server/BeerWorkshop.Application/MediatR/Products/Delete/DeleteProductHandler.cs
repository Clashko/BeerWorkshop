using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities.Products;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Products.Delete;

public class DeleteProductHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<DeleteProductCommand, MediatrResponseDto<Unit>>
{
    public async Task<MediatrResponseDto<Unit>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        using var transaction = context.Database.BeginTransaction();
        try
        {
            var product = await context.Products
                .Where(p => p.Id.Equals(request.Id))
                .Include(s => s.Statistics)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (product is null)
                return MediatrResponseDto<Unit>.NotFound("Product not founded");

            if (product.Statistics.Count > 0)
            {
                var deletedProductStatistic = mapper.Map<IEnumerable<DeletedProductsStatisticEntity>>(product.Statistics, opts => { opts.Items["ProductName"] = product.Name; opts.Items["ProductType"] = product.ProductType; });
                await context.DeletedProductsStatistics.AddRangeAsync(deletedProductStatistic, cancellationToken);
            }

            context.Products.Remove(product);

            await context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            return MediatrResponseDto<Unit>.Success(Unit.Value, $"Product with id: {request.Id} is successfully deleted");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync(cancellationToken);

            Console.WriteLine(ex.Message);
            return MediatrResponseDto<Unit>.Failure($"Error while deleting product: {ex.Message}");
        }
    }
}