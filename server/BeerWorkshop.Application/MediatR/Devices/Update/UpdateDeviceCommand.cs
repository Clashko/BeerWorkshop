using BeerWorkshop.Application.Dto.Requests.Devices;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Update;

public record UpdateDeviceCommand(Guid Id, UpdateDeviceRequestDto Data) : IRequest<MediatrResponseDto<DeviceResponseDto>>;