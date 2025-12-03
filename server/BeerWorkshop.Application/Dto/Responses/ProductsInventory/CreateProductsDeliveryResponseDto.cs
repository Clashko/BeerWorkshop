namespace BeerWorkshop.Application.Dto.Responses.ProductsInventory;

public record CreateProductsDeliveryResponseDto(IEnumerable<ProductInventoryResponseDto> Inventory, string CheckContent, decimal TotalAmount);