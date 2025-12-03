using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.DevicesInventory;

public record UpdateDeviceInventoryItemRequestDto(
    decimal Quantity,
    DateTime IncomingDate,
    decimal PurchasePrice,
    decimal PurchaseVat,
    decimal RetailPrice
);