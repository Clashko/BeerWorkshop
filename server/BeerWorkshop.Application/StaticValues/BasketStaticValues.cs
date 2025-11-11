using BeerWorkshop.Application.Enums;

namespace BeerWorkshop.Application.StaticValues
{
    public static class BasketStaticValues
    {
        public const string OrganizationName = "ЧУП \"ЭлиасТрейд\"";
        public const string OrganizationCityAndAddress = "222161 Г. Жодино, пер. Автозаводской";
        public const string OrganizationHomeAndApartment = "д. 2, кв. 19";
        public const string OrganizationUnp = "693398758";
        public const string RetailDocument = "Платёжный документ";
        public const string WriteOffDocument = "Списание";
        public const string Unp = "УНП";
        public const string Cashier = "Кассир:";
        public const string TotalDiscount = "Общая скидка";
        public const string TotalPrice = "К оплате";

        public static Dictionary<FormatEnum, string> Formats { get; } = new Dictionary<FormatEnum, string>()
        {
            {FormatEnum.Number, "№ {0:D3} от {1:dd.MM.yyyy}"},
            {FormatEnum.ItemRow, "{0}{1} * {2} BYN"},
            {FormatEnum.ItemDiscountRow, "Скидка {0}%"},
            {FormatEnum.TotalDiscount, "{0}%"},
            {FormatEnum.TotalPrice, "{0} BYN"}
        };
    }
}