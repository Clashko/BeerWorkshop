namespace BeerWorkshop.Application.Dto.Requests.DevicesInventory;

public record CreateDevicesDeliveryRequestDto(
    Guid DeviceId,
    IEnumerable<CreateDeviceInventoryItemRequestDto> Items
);