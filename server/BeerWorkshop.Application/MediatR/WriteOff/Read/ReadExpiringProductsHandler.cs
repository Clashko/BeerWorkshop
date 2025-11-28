using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.WriteOff.Read;

public class ReadExpiringProductsHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadExpiringProductsQuery, MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>>
{
    public async Task<MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>> Handle(ReadExpiringProductsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var expiringItems = await context.ProductsInventory
                .Where(p =>
                    (
                        p.ExpirationCountingDateType.Equals(ExpirationCountingDateType.ManufactureDate) &&
                        (
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Hours) && p.ManufactureDate.AddHours(p.ExpirationTime) <= DateTime.Now) ||
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Days) && p.ManufactureDate.AddDays(p.ExpirationTime) <= DateTime.Now) ||
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Month) && p.ManufactureDate.AddMonths(p.ExpirationTime) <= DateTime.Now)
                        )
                    )
                    ||
                    (
                        p.ExpirationCountingDateType.Equals(ExpirationCountingDateType.OpeningDate) && p.OpeningDate != null &&
                        (
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Hours) && p.OpeningDate.Value.AddHours(p.ExpirationTime) <= DateTime.Now) ||
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Days) && p.OpeningDate.Value.AddDays(p.ExpirationTime) <= DateTime.Now) ||
                            (p.ExpirationMeasure.Equals(ExpirationMeasure.Month) && p.OpeningDate.Value.AddMonths(p.ExpirationTime) <= DateTime.Now)
                        )
                    ))
                .Include(p => p.Product)
                .GroupBy(p => p.Product)
                .ToListAsync(cancellationToken);

            if (expiringItems == null || expiringItems.Count == 0)
                return MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>.NotFound("Expiring products not founded");

            var result = expiringItems.Select(g => new ExpiringProductResponseDto(
                Product: mapper.Map<ProductResponseDto>(g.Key),
                ExpiringItems: mapper.Map<IEnumerable<ExpiringProductInventoryItemResponseDto>>(g)
            ));

            return MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>.Success(result, $"Founded expiring products: {result.Sum(r => r.ExpiringItems.Count())}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>.Failure($"Error while reading expiring products: {ex.Message}");
        }
    }
}