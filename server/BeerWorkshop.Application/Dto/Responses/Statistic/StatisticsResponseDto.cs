namespace BeerWorkshop.Application.Dto.Responses.Statistic
{
    public record StatisticsResponseDto(
        IEnumerable<StatisticRowResponseDto> ProductsStatistic,
        IEnumerable<StatisticRowResponseDto> DevicesStatistic
    );
}