using BeerWorkshop.Application.Dto.Responses;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Delete;

public record DeleteDeviceCommand(Guid Id) : IRequest<MediatrResponseDto<Unit>>;