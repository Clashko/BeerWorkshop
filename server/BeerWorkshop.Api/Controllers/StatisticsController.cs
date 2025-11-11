using BeerWorkshop.Application.MediatR.Statistics;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

public class StatisticsController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadStatisticsQuery()));
}