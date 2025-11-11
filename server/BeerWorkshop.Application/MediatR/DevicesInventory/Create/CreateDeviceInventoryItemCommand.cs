using BeerWorkshop.Application.Dto.Requests.DevicesInventory;
using BeerWorkshop.Application.Dto.Responses;
using BeerWorkshop.Application.Dto.Responses.DevicesInventory;
using MediatR;

namespace BeerWorkshop.Application.MediatR.DevicesInventory.Create;

public record CreateDeviceInventoryItemCommand(CreateDeviceInventoryItemRequestDto Data) : IRequest<MediatrResponseDto<DeviceInventoryItemResponseDto>>;
