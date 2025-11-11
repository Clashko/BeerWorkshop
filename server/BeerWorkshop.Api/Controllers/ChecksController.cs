using BeerWorkshop.Application.Dto.Requests.Checks;
using BeerWorkshop.Application.MediatR.Checks.GetContent;
using BeerWorkshop.Application.MediatR.Checks.Read;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

public class ChecksController(IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Read(ReadChecksRequestDto dto) => HandleResult(await mediator.Send(new ReadChecksQuery(dto)));
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCheckContent(Guid id) => HandleResult(await mediator.Send(new GetCheckContentCommand(id)));
}