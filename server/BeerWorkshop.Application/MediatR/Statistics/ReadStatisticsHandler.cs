using AutoMapper;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Products;
using BeerWorkshop.Application.Dto.Responses.Statistic;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Statistics;

public class ReadStatisticsHandler(BeerWorkshopContext context, IMapper mapper) : IRequestHandler<ReadStatisticsQuery, MediatrResponseDto<StatisticsResponseDto>>
{
    public async Task<MediatrResponseDto<StatisticsResponseDto>> Handle(ReadStatisticsQuery request, CancellationToken cancellationToken)
    {
        try
        {

            var productsStatistic = await context.ProductsStatistic.Include(p => p.Product).ToListAsync(cancellationToken);
            var devicesStatistic = await context.DevicesStatistic.Include(p => p.Device).ToListAsync(cancellationToken);

            if (productsStatistic.Count == 0 && devicesStatistic.Count == 0)
                return MediatrResponseDto<StatisticsResponseDto>.NotFound("Statistics for products and devices not founded");

            var result = new StatisticsResponseDto(
                mapper.Map<IEnumerable<StatisticRowResponseDto>>(productsStatistic),
                mapper.Map<IEnumerable<StatisticRowResponseDto>>(devicesStatistic)
            );

            return MediatrResponseDto<StatisticsResponseDto>.Success(result, $"Founded products statistics rows: {productsStatistic.Count}, Founded devices statistics rows: {devicesStatistic.Count}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return MediatrResponseDto<StatisticsResponseDto>.Failure($"Error while reading products: {ex.Message}");
        }
    }
}