namespace BeerWorkshop.Application.Dto.Requests.Basket;

public record RealizationItemRequestDto(Guid Id, decimal Quantity, int? DiscountPercent);