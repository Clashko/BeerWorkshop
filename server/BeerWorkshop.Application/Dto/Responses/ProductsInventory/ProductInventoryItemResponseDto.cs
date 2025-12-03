using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Responses.ProductsInventory;

public record ProductInventoryItemResponseDto(
    Guid Id,
    decimal Quantity,
    DateTime IncomingDate,
    DateTime? OpeningDate,
    decimal PurchasePrice,
    decimal RetailPrice,
    decimal PricePerQuantity,
    DateTime ManufactureDate,
    int ExpirationTime,
    ExpirationMeasure ExpirationMeasure,
    ExpirationCountingDateType ExpirationCountingDateType
);