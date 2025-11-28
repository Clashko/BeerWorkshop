using BeerWorkshop.Application.Dto.Requests.Statistic;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Statistic;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Statistics;

public record ReadStatisticsQuery(StatisticRequestDto Dto) : IRequest<MediatrResponseDto<StatisticsResponseDto>>;