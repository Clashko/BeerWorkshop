using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.MediatR.Users.GetMe;
using BeerWorkshop.Application.MediatR.Users.Login;
using BeerWorkshop.Application.MediatR.Users.RefreshToken;
using BeerWorkshop.Application.MediatR.Users.Register;
using BeerWorkshop.Application.MediatR.Users.RevokeToken;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[Route("api/[controller]/[action]")]
public class AuthController(IMediator mediator) : BaseApiController
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetMe() => HandleResult(await mediator.Send(new GetMeCommand(GetAuthenticatedUserId())));

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Login(LoginUserRequestDto dto) => HandleResult(await mediator.Send(new LoginCommand(dto)));

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register(RegisterUserRequestDto dto) => HandleResult(await mediator.Send(new RegisterCommand(dto)));

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequestDto dto) => HandleResult(await mediator.Send(new RefreshTokenCommand(dto)));

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> RevokeToken() => HandleResult(await mediator.Send(new RevokeTokenCommand(GetAuthenticatedUserId())));
}