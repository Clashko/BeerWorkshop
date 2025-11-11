using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.Devices;
using MediatR;

namespace BeerWorkshop.Application.MediatR.Devices.Read;

public record ReadDevicesQuery() : IRequest<MediatrResponseDto<IEnumerable<DeviceResponseDto>>>;