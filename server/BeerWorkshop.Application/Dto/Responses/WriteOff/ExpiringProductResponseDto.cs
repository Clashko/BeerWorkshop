using BeerWorkshop.Application.Dto.Responses.Products;

namespace BeerWorkshop.Application.Dto.Responses.WriteOff;

public record ExpiringProductResponseDto(
    ProductResponseDto Product,
    IEnumerable<ExpiringProductInventoryItemResponseDto> ExpiringItems
);