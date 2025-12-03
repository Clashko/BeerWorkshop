namespace BeerWorkshop.Application.Dto.Responses.DevicesInventory;

public record DeviceInventoryItemResponseDto(
    Guid Id,
    decimal Quantity,
    DateTime IncomingDate,
    decimal PurchasePrice,
    decimal PurchaseVat,
    decimal RetailPrice
);