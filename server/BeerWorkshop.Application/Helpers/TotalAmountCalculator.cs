using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.Helpers
{
    public static class TotalAmountCalculator
    {
        public static decimal CalculateTotalAmount(decimal price, decimal pricePerQuantity, decimal quantity)
        {
            if (pricePerQuantity <= 0)
                throw new ArgumentOutOfRangeException(nameof(pricePerQuantity), "Price per quantity must be greater then zero");

            return quantity / pricePerQuantity * price;
        }

        public static decimal CountTotalAmountWithDiscount(decimal price, decimal quantity, decimal pricePerQuantity, DiscountCalculatorType discountCalculatorType, int? discountPercent, int? totalDiscount)
        {
            var totalAmount = CalculateTotalAmount(price, pricePerQuantity, quantity);

            return discountCalculatorType switch
            {
                DiscountCalculatorType.FullDiscount => CountTotalPriceWithFullDiscount(totalAmount, discountPercent, totalDiscount),
                DiscountCalculatorType.OnlyItemDiscount => CountOnlyItemTotalPriceWithOnlyItemDiscount(totalAmount, discountPercent),
                DiscountCalculatorType.OnlyTotalDiscount => CountTotalPriceWithOnlyTotalDiscount(totalAmount, totalDiscount),
                _ => throw new NotImplementedException(),
            };
        }

        private static decimal CountTotalPriceWithFullDiscount(decimal price, int? discountPercent, int? totalDiscount)
        {
            if (discountPercent is null && totalDiscount is null)
                return price;

            if (discountPercent is not null)
                price -= price * (discountPercent.Value / 100m);

            if (totalDiscount is not null)
                price -= price * (totalDiscount.Value / 100m);

            return price;
        }

        private static decimal CountOnlyItemTotalPriceWithOnlyItemDiscount(decimal price, int? discountPercent)
        {
            if (discountPercent is null)
                return price;

            if (discountPercent is not null)
                price -= price * (discountPercent.Value / 100m);

            return price;
        }

        private static decimal CountTotalPriceWithOnlyTotalDiscount(decimal price, int? totalDiscount)
        {
            if (totalDiscount is null)
                return price;

            if (totalDiscount is not null)
                price -= price * (totalDiscount.Value / 100m);

            return price;
        }
    }
}