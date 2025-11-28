using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using MediatR;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public record DeleteExpiringProductCommand(IEnumerable<Guid> Ids, Guid UserId) : IRequest<MediatrResponseDto<WriteOffResponseDto>>;