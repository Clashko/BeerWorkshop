using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.ProductsInventory;

public record ProductInventoryItemResponseDto(
    Guid Id,
    decimal Quantity,
    DateTime IncomingDate,
    decimal PurchasePrice,
    decimal RetailPrice
);