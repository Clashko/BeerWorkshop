using BeerWorkshop.Application.Dto.Requests.WriteOff;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.WriteOff;
using MediatR;

namespace BeerWorkshop.Application.MediatR.WriteOff.Delete;

public record DeleteExpiringProductCommand(WriteOffRequestDto Data) : IRequest<MediatrResponseDto<WriteOffResponseDto>>;