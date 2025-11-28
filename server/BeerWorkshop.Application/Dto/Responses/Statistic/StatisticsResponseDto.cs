namespace BeerWorkshop.Application.Dto.Responses.Statistic
{
    public record StatisticsResponseDto(
        IEnumerable<StatisticProductRowResponseDto> ProductsStatistic,
        IEnumerable<StatisticDeviceRowResponseDto> DevicesStatistic
    );
}