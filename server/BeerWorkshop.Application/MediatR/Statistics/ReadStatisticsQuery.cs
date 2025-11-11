using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Statistic;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Statistics;

public record ReadStatisticsQuery() : IRequest<MediatrResponseDto<StatisticsResponseDto>>;