using BeerWorkshop.Application.Dto.Responses.Devices;

namespace BeerWorkshop.Application.Dto.Responses.DevicesInventory;

public record DeviceInventoryResponseDto(
    DeviceResponseDto Device,
    IEnumerable<DeviceInventoryItemResponseDto> InventoryItems
);