using BeerWorkshop.Application.Dto.Requests.Basket;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Basket;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Basket;

public record RealizeCommand(RealizationRequestDto Data, Guid UserId) : IRequest<MediatrResponseDto<RealizationResponseDto>>;
