using BeerWorkshop.Application.Enums;
using BeerWorkshop.Database.Entities.Users;

namespace BeerWorkshop.Application.Models;

public record CheckModel(UserEntity Cashier, List<CheckRow> Items, decimal TotalPrice, DiscountCalculatorType DiscountCalculatorType = DiscountCalculatorType.FullDiscount, int? TotalDiscount = null);