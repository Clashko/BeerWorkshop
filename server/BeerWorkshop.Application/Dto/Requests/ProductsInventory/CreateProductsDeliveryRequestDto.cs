namespace BeerWorkshop.Application.Dto.Requests.ProductsInventory;

public record CreateProductsDeliveryRequestDto(
    Guid ProductId,
    IEnumerable<CreateProductInventoryItemRequestDto> Items
);