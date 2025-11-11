using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.Dto.Requests.Checks
{
    public record ReadChecksRequestDto(ReadChecksPeriodType PeriodType, DateTime FirstDate, DateTime? SecondDate = null);
}