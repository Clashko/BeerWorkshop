using BeerWorkshop.Application.Dto.Requests.Statistic;
using BeerWorkshop.Application.MediatR.Statistics;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class StatisticsController(IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Read(StatisticRequestDto dto) => HandleResult(await mediator.Send(new ReadStatisticsQuery(dto)));
}