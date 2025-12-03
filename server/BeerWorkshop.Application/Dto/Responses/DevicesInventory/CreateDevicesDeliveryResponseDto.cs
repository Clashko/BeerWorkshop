namespace BeerWorkshop.Application.Dto.Responses.DevicesInventory;

public record CreateDevicesDeliveryResponseDto(
    IEnumerable<DeviceInventoryResponseDto> Inventory, string CheckContent, decimal TotalAmount
);