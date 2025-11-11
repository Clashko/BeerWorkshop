using BeerWorkshop.Application.Dto.Requests.DevicesInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Update;

public record UpdateDeviceInventoryItemCommand(Guid Id, UpdateDeviceInventoryItemRequestDto Data) : IRequest<MediatrResponseDto<DeviceInventoryItemResponseDto>>;
