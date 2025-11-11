using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using MediatR;

namespace BeerWorkshop.Application.MediatR.WriteOff.Read;

public record ReadExpiringProductsQuery() : IRequest<MediatrResponseDto<IEnumerable<ExpiringProductResponseDto>>>;