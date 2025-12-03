using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.ProductsInventory;

public record CreateProductInventoryItemRequestDto(
    Guid ProductId,
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