using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.GetMe;

public record GetMeCommand(Guid UserId) : IRequest<MediatrResponseDto<UserResponseDto>>;