using BeerWorkshop.Application.Enums;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.StaticValues
{
    public static class BasketStaticValues
    {
        public const string OrganizationName = "ЧУП \"ЭлиасТрейд\"";
        public const string OrganizationCityAndAddress = "222161 Г. Жодино, пер. Автозаводской";
        public const string OrganizationHomeAndApartment = "д. 2, кв. 19";
        public const string OrganizationUnp = "693398758";
        public const string ArrivalDocument = "Приход";
        public const string RetailDocument = "Платёжный документ";
        public const string WriteOffDocument = "Списание";
        public const string Unp = "УНП";
        public const string Cashier = "Кассир:";
        public const string TotalDiscount = "Общая скидка";
        public const string TotalPrice = "К оплате";
        public const string PricePlaceholder = "Итого";

        public static Dictionary<UnitOfMeasure, string> Measures { get; } = new Dictionary<UnitOfMeasure, string>()
        {
            {UnitOfMeasure.Piece, "шт."},
            {UnitOfMeasure.Gram, "гр."},
            {UnitOfMeasure.Kilogram, "кг."},
            {UnitOfMeasure.Liter, "л."},
        };

        public static Dictionary<FormatEnum, string> Formats { get; } = new Dictionary<FormatEnum, string>()
        {
            {FormatEnum.Number, "№ {0:D3} от {1:dd.MM.yyyy}"},
            {FormatEnum.ItemRow, "{0}{1} * {2:F2} BYN"},
            {FormatEnum.ItemRowPricePerQuantity, " / {0}{1}"},
            {FormatEnum.ItemDiscountRow, "Скидка {0}%"},
            {FormatEnum.TotalDiscount, "{0}%"},
            {FormatEnum.TotalPrice, "{0} BYN"}
        };
    }
}