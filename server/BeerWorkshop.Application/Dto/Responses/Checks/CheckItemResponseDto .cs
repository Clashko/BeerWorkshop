namespace BeerWorkshop.Application.Dto.Responses.Checks;

public record CheckItemResponseDto(
    string Name,
    decimal Quantity,
    decimal Price,
    string? Discount
);