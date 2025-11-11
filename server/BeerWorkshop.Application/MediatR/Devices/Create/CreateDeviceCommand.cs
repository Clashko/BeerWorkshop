using BeerWorkshop.Application.Dto.Requests.Devices;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Create;

public record CreateDeviceCommand(CreateDeviceRequestDto Data) : IRequest<MediatrResponseDto<DeviceResponseDto>>;
