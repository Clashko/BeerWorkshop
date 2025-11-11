using BeerWorkshop.Api.Dto;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BeerWorkshop.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    public IActionResult HandleResult<T>(MediatrResponseDto<T> response) =>
        response is null
            ? Forbid()
            : response.ResponseStatus switch
            {
                ResponseStatus.Success => Ok(new ApiResponseDto<T>(response.Result!, response.Message)),
                ResponseStatus.NotFound => NotFound(response.Message),
                ResponseStatus.BadRequest => BadRequest(response.Message),
                _ => throw new NotImplementedException(),
            };
}