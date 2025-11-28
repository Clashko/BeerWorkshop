using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.ProductsInventory;

public record CreateProductInventoryItemRequestDto(
    decimal Quantity,
    DateTime IncomingDate,
    DateTime? OpeningDate,
    decimal PurchasePrice,
    decimal RetailPrice,
    DateTime ManufactureDate,
    int ExpirationTime,
    ExpirationMeasure ExpirationMeasure,
    ExpirationCountingDateType ExpirationCountingDateType,
    Guid ProductId
);