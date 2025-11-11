using System.Text;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Application.StaticValues;
using BeerWorkshop.Database.Enums;
using Microsoft.Extensions.Configuration;

namespace BeerWorkshop.Application.Services;

public class CheckGenerator(ICheckNumberService checkNumberService, IConfiguration configuration) : ICheckGenerator
{
    public CheckGenerationResult GenerateCheck(CheckModel checkModel, TransactionType transactionType)
    {
        var parameters = checkNumberService.GetParameters();

        var sb = new StringBuilder();
        AppendHeaderSection(sb);
        AppendReatilDocumentSection(sb, transactionType, parameters, checkModel.Cashier);
        AppendItemsSection(sb, checkModel.DiscountCalculatorType, checkModel.Items);
        AppendTotalDiscountSection(sb, checkModel.DiscountCalculatorType, checkModel.TotalDiscount);
        AppendTotalPriceSection(sb, checkModel.TotalPrice);
        return new CheckGenerationResult(sb.ToString(), parameters.OrderNumber);
    }

    private void AppendHeaderSection(StringBuilder sb)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");

        sb.AppendLine(BasketStaticValues.OrganizationName.PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.OrganizationCityAndAddress);
        sb.AppendLine(BasketStaticValues.OrganizationHomeAndApartment.PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.Unp + BasketStaticValues.OrganizationUnp.PadLeft(lineLenght - BasketStaticValues.Unp.Length));
        AppendSeparator(sb);
    }

    private void AppendReatilDocumentSection(StringBuilder sb, TransactionType transactionType, CheckNumberServiceParameters parameters, string cashier)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");

        switch (transactionType)
        {
            case TransactionType.Sale:
                sb.AppendLine(BasketStaticValues.RetailDocument.PaddingLeft(lineLenght));
                break;
            case TransactionType.WriteOff:
                sb.AppendLine(BasketStaticValues.WriteOffDocument.PaddingLeft(lineLenght));
                break;
        }

        sb.AppendLine(string.Format(BasketStaticValues.Formats[FormatEnum.Number], parameters.OrderNumber, parameters.WorkingDate).PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.Cashier + cashier.PadLeft(lineLenght - BasketStaticValues.Cashier.Length));
        AppendSeparator(sb);
    }

    private void AppendItemsSection(StringBuilder sb, DiscountCalculatorType discountCalculatorType, List<CheckRow> items)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");

        foreach (var item in items)
        {
            var summaryResult = string.Format(BasketStaticValues.Formats[FormatEnum.ItemRow], item.Quantity, item.Measure, item.Price);
            sb.AppendLine(item.Name + summaryResult.PadLeft(lineLenght - item.Name.Length));

            if (item.Discount is not null && (discountCalculatorType.Equals(DiscountCalculatorType.FullDiscount) || discountCalculatorType.Equals(DiscountCalculatorType.OnlyItemDiscount)))
            {
                var discountResult = string.Format(BasketStaticValues.Formats[FormatEnum.ItemDiscountRow], item.Discount);
                sb.AppendLine(discountResult.PadLeft(lineLenght));
            }
        }
        AppendSeparator(sb);
    }

    private void AppendTotalDiscountSection(StringBuilder sb, DiscountCalculatorType discountCalculatorType, int? totalDiscount)
    {
        if (totalDiscount is not null && (discountCalculatorType.Equals(DiscountCalculatorType.FullDiscount) || discountCalculatorType.Equals(DiscountCalculatorType.OnlyTotalDiscount)))
        {
            var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");
            var formatResult = string.Format(BasketStaticValues.Formats[FormatEnum.TotalDiscount], totalDiscount);
            sb.AppendLine(BasketStaticValues.TotalDiscount + formatResult.PadLeft(lineLenght - BasketStaticValues.TotalDiscount.Length));
            AppendSeparator(sb);
        }
    }

    private void AppendTotalPriceSection(StringBuilder sb, decimal totalPrice)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");
        var formatResult = string.Format(BasketStaticValues.Formats[FormatEnum.TotalPrice], totalPrice);
        sb.AppendLine(BasketStaticValues.TotalPrice + formatResult.PadLeft(lineLenght - BasketStaticValues.TotalPrice.Length));
    }

    private void AppendSeparator(StringBuilder sb)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");
        sb.AppendLine(new string('-', lineLenght));
    }
}