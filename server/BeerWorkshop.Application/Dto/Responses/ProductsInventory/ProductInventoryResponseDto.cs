using BeerWorkshop.Application.Dto.Responses.Products;

namespace BeerWorkshop.Application.Dto.Responses.ProductsInventory;

public record ProductInventoryResponseDto(
    ProductResponseDto Product,
    IEnumerable<ProductInventoryItemResponseDto> InventoryItems
);