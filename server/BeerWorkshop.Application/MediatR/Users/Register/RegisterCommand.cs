using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.Dto.Responses;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.Register
{
    public record RegisterCommand(RegisterUserRequestDto Dto) : IRequest<MediatrResponseDto<Unit>>;
}