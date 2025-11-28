using BeerWorkshop.Application.MediatR.WriteOff.Delete;
using BeerWorkshop.Application.MediatR.WriteOff.Read;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class WriteOffController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> Read() => HandleResult(await mediator.Send(new ReadExpiringProductsQuery()));

    [HttpDelete()]
    public async Task<IActionResult> Delete(IEnumerable<Guid> ids) => HandleResult(await mediator.Send(new DeleteExpiringProductCommand(ids, GetAuthenticatedUserId())));
}