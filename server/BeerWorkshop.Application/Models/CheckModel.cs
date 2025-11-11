using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.Models;

public record CheckModel(string Cashier, List<CheckRow> Items, decimal TotalPrice, DiscountCalculatorType DiscountCalculatorType = DiscountCalculatorType.FullDiscount, int? TotalDiscount = null);