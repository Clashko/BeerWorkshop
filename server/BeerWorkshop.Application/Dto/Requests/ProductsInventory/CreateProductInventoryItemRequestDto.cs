using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Dto.Requests.ProductsInventory;

public record CreateProductInventoryItemRequestDto(
    decimal Quantity,
    DateTime IncomingDate,
    decimal PurchasePrice,
    decimal RetailPrice,
    DateTime ManufactureDate,
    int ExpirationTime,
    ExpirationMeasure ExpirationMeasure,
    Guid ProductId
);