using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Statistic;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Application.MediatR.Statistics;

public class ReadStatisticsHandler(BeerWorkshopContext context) : IRequestHandler<ReadStatisticsQuery, MediatrResponseDto<StatisticsResponseDto>>
{
    public async Task<MediatrResponseDto<StatisticsResponseDto>> Handle(ReadStatisticsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var productsStatistic = await context.ProductsStatistic
                .Where(p => p.TransactionDate.Date >= request.Dto.FirstDate.Date && p.TransactionDate.Date <= request.Dto.SecondDate.Date && p.TransactionType == TransactionType.Sale)
                .Include(p => p.Product)
                .ToListAsync(cancellationToken);

            var deletedProductsStatistic = await context.DeletedProductsStatistics
                .Where(p => p.TransactionDate.Date >= request.Dto.FirstDate.Date && p.TransactionDate.Date <= request.Dto.SecondDate.Date && p.TransactionType == TransactionType.Sale)
                .ToListAsync(cancellationToken);

            var devicesStatistic = await context.DevicesStatistic
                .Where(p => p.TransactionDate.Date >= request.Dto.FirstDate.Date && p.TransactionDate.Date <= request.Dto.SecondDate.Date && p.TransactionType == TransactionType.Sale)
                .Include(p => p.Device)
                .ToListAsync(cancellationToken);

            var deletedDevicesStatistic = await context.DeletedDevicesStatistics
                .Where(p => p.TransactionDate.Date >= request.Dto.FirstDate.Date && p.TransactionDate.Date <= request.Dto.SecondDate.Date && p.TransactionType == TransactionType.Sale)
                .ToListAsync(cancellationToken);

            if (productsStatistic.Count == 0 && devicesStatistic.Count == 0)
                return MediatrResponseDto<StatisticsResponseDto>.NotFound("Statistics for products and devices not founded");

            var productResult = productsStatistic.Select(p => new StatisticProductRowResponseDto(p.Product.Name, p.Product.ProductType, p.TransactionType, p.Quantity, p.Price, p.Discount, p.TotalAmount, p.TransactionDate)).ToList();
            productResult.AddRange(deletedProductsStatistic.Select(p => new StatisticProductRowResponseDto(p.ProductName, p.ProductType, p.TransactionType, p.Quantity, p.Price, p.Discount, p.TotalAmount, p.TransactionDate)));

            var devicesResult = devicesStatistic.Select(p => new StatisticDeviceRowResponseDto(p.Device.Name, p.TransactionType, p.Quantity, p.Price, p.Discount, p.TotalAmount, p.TransactionDate)).ToList();
            devicesResult.AddRange(deletedDevicesStatistic.Select(p => new StatisticDeviceRowResponseDto(p.DeviceName, p.TransactionType, p.Quantity, p.Price, p.Discount, p.TotalAmount, p.TransactionDate)));

            var result = new StatisticsResponseDto(
                productResult,
                devicesResult
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