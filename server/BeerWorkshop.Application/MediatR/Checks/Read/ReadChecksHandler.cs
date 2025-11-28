using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Checks;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Database.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Checks.Read
{
    public class ReadChecksHandler(BeerWorkshopContext context) : IRequestHandler<ReadChecksQuery, MediatrResponseDto<IEnumerable<CheckResponseDto>>>
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
                        ? c.TransactionDate.Date.Equals(request.Data.FirstDate.ToLocalTime().Date)
                        : c.TransactionDate.Date >= request.Data.FirstDate.ToLocalTime().Date && c.TransactionDate.Date <= request.Data.SecondDate!.Value.ToLocalTime().Date)
                    .ToListAsync(cancellationToken);

                if (checks is null)
                    return MediatrResponseDto<IEnumerable<CheckResponseDto>>.NotFound("Checks not founded");

                var result = new List<CheckResponseDto>();

                foreach (var check in checks)
                {
                    var items = new List<CheckItemResponseDto>();
                    items.AddRange(check.ProductsStatistics.Select(ps => new CheckItemResponseDto(ps.Product.Name, ps.Quantity, ps.Price, ps.Discount)));
                    items.AddRange(check.DeletedProductsStatistics.Select(ps => new CheckItemResponseDto(ps.ProductName, ps.Quantity, ps.Price, ps.Discount)));
                    items.AddRange(check.DevicesStatistics.Select(ps => new CheckItemResponseDto(ps.Device.Name, ps.Quantity, ps.Price, ps.Discount)));
                    items.AddRange(check.DeletedDevicesStatistics.Select(ps => new CheckItemResponseDto(ps.DeviceName, ps.Quantity, ps.Price, ps.Discount)));

                    result.Add(new CheckResponseDto(check.Id, check.OrderNumber, check.TotalAmount, check.TransactionType, check.TransactionDate, items));
                }

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