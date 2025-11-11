using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.Dto.Requests.Basket;
public record RealizationRequestDto(IEnumerable<RealizationItemRequestDto> Products, IEnumerable<RealizationItemRequestDto> Devices, string Cashier, int? TotalDiscount = null, DiscountCalculatorType DiscountCalculatorType = DiscountCalculatorType.FullDiscount);
