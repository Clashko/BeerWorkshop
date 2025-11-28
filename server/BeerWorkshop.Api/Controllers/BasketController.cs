using BeerWorkshop.Application.Dto.Requests.Basket;
using BeerWorkshop.Application.MediatR.Basket;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Authorize]
public class BasketController(IMediator mediator) : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Realize(RealizationRequestDto dto) => HandleResult(await mediator.Send(new RealizeCommand(dto, GetAuthenticatedUserId())));
}