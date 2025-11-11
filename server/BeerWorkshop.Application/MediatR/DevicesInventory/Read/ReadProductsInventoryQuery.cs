using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Read;

public record ReadDevicesInventoryQuery() : IRequest<MediatrResponseDto<IEnumerable<DeviceInventoryResponseDto>>>;