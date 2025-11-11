namespace BeerWorkshop.Application.Dto.Requests.DevicesInventory;

public record CreateDeviceInventoryItemRequestDto(
    decimal Quantity,
    DateTime IncomingDate,
    decimal PurchasePrice,
    decimal RetailPrice,
    Guid DeviceId
);