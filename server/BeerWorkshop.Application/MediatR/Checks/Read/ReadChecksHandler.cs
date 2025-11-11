using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Checks;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Checks.Read
{
    public class ReadChecksHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadChecksQuery, MediatrResponseDto<IEnumerable<CheckResponseDto>>>
    {
        public async Task<MediatrResponseDto<IEnumerable<CheckResponseDto>>> Handle(ReadChecksQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var checks = await context.Checks
                    .Include(c => c.ProductsStatistics).ThenInclude(c => c.Product)
                    .Include(c => c.DeletedProductsStatistics)
                    .Include(c => c.DevicesStatistics).ThenInclude(c => c.Device)
                    .Include(c => c.DeletedDevicesStatistics)
                    .Where(c => request.Data.PeriodType.Equals(ReadChecksPeriodType.Day)
                        ? c.TransactionDate.Date.Equals(request.Data.FirstDate.Date)
                        : c.TransactionDate >= request.Data.FirstDate.Date && c.TransactionDate <= request.Data.SecondDate!.Value.Date)
                    .ToListAsync(cancellationToken);

                if (checks is null)
                    return MediatrResponseDto<IEnumerable<CheckResponseDto>>.NotFound("Checks not founded");

                var result = mapper.Map<IEnumerable<CheckResponseDto>>(checks);

                return MediatrResponseDto<IEnumerable<CheckResponseDto>>.Success(result, $"Founded checks: {checks.Count}");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return MediatrResponseDto<IEnumerable<CheckResponseDto>>.Failure($"Error while reading checks: {ex.Message}");
            }
        }
    }
}