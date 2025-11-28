using BeerWorkshop.Application.Dto.Requests.Users;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Users;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Users.RefreshToken;

public record RefreshTokenCommand(RefreshTokenRequestDto Dto) : IRequest<MediatrResponseDto<TokensResponseDto>>;