using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.RevokeToken;

public record RevokeTokenCommand(Guid UserId) : IRequest<MediatrResponseDto<Unit>>;