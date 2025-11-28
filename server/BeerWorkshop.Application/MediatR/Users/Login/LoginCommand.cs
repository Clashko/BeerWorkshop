using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.Login;

public record LoginCommand(LoginUserRequestDto Dto) : IRequest<MediatrResponseDto<TokensResponseDto>>;