using System.Text;
using BeerWorkshop.Application.Enums;
using BeerWorkshop.Application.Helpers;
using BeerWorkshop.Application.Models;
using BeerWorkshop.Application.Services.Interfaces;
using BeerWorkshop.Application.StaticValues;
using BeerWorkshop.Database.Contexts;
using BeerWorkshop.Database.Entities;
using BeerWorkshop.Database.Entities.Users;
using BeerWorkshop.Database.Enums;
using Microsoft.Extensions.Configuration;

namespace BeerWorkshop.Application.Services;

public class CheckGenerator(BeerWorkshopContext context, ICheckNumberService checkNumberService, IConfiguration configuration) : ICheckGenerator
{
    public async Task<string> GenerateAndSaveCheckAsync(Guid checkRowGuid, List<CheckRow> checkRows, decimal totalPrice, DateTime transactionDate, TransactionType transactionType, UserEntity cashier)
    {
        var check = GenerateCheck(new CheckModel(cashier, checkRows, totalPrice), transactionType);

        var path = configuration.CreateCheckDirectoriesAndGeneratePath(check.OrderNumber, transactionDate);

        File.WriteAllText(path, check.CheckContent);

        context.Checks.Add(new CheckEntity()
        {
            Id = checkRowGuid,
            Path = path,
            TransactionDate = transactionDate,
            TotalAmount = totalPrice,
            TransactionType = transactionType,
            OrderNumber = check.OrderNumber,
        });

        await context.SaveChangesAsync();

        return check.CheckContent;
    }

    public CheckGenerationResult GenerateCheck(CheckModel checkModel, TransactionType transactionType)
    {
        var parameters = checkNumberService.GetParameters();

        var sb = new StringBuilder();
        AppendHeaderSection(sb);
        AppendReatilDocumentSection(sb, transactionType, parameters, $"{checkModel.Cashier.LastName} {checkModel.Cashier.FirstName[0].ToString().ToUpper()}.{checkModel.Cashier.SurName[0].ToString().ToUpper()}.");
        AppendItemsSection(sb, checkModel.DiscountCalculatorType, checkModel.Items);
        AppendTotalDiscountSection(sb, checkModel.DiscountCalculatorType, checkModel.TotalDiscount);
        AppendTotalPriceSection(sb, checkModel.TotalPrice, transactionType);
        return new CheckGenerationResult(sb.ToString(), parameters.OrderNumber);
    }

    private void AppendHeaderSection(StringBuilder sb)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");

        sb.AppendLine(BasketStaticValues.OrganizationName.PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.OrganizationCityAndAddress.PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.OrganizationHomeAndApartment.PaddingLeft(lineLenght));
        sb.AppendLine(BasketStaticValues.Unp + BasketStaticValues.OrganizationUnp.PadLeft(lineLenght - BasketStaticValues.Unp.Length));
        AppendSeparator(sb);
    }

    private void AppendReatilDocumentSection(StringBuilder sb, TransactionType transactionType, CheckNumberServiceParameters parameters, string cashier)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");

        switch (transactionType)
        {
            case TransactionType.Arrival:
                sb.AppendLine(BasketStaticValues.ArrivalDocument.PaddingLeft(lineLenght));
                break;
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
            var price = item.vat != null && item.vat > 0 ? item.Price * (1 + item.vat / 100) : item.Price;
            var summaryResult = string.Format(BasketStaticValues.Formats[FormatEnum.ItemRow], item.Quantity, BasketStaticValues.Measures[item.Measure], price);
            if (item.PricePerQuantity > 1)
            {
                summaryResult += string.Format(BasketStaticValues.Formats[FormatEnum.ItemRowPricePerQuantity], item.PricePerQuantity, BasketStaticValues.Measures[item.Measure]);
            }

            var lines = new List<string>();
            var name = item.Name;

            while (name.Length > 0)
            {
                int take = Math.Min(name.Length, lineLenght - 2 - summaryResult.Length);
                lines.Add(name[..take]);
                name = name[take..];
            }

            for (int i = 0; i < lines.Count - 1; i++)
            {
                sb.AppendLine(lines[i]);
            }

            sb.AppendLine(lines.Last() + summaryResult.PadLeft(lineLenght - lines.Last().Length));

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

    private void AppendTotalPriceSection(StringBuilder sb, decimal totalPrice, TransactionType transactionType)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");
        var formatResult = string.Format(BasketStaticValues.Formats[FormatEnum.TotalPrice], totalPrice);
        var placeholder = transactionType switch
        {
            TransactionType.Arrival or TransactionType.WriteOff => BasketStaticValues.PricePlaceholder,
            _ => BasketStaticValues.TotalPrice
        };
        sb.AppendLine(placeholder + formatResult.PadLeft(lineLenght - placeholder.Length));
    }

    private void AppendSeparator(StringBuilder sb)
    {
        var lineLenght = configuration.GetSection("CheckConfiguration").GetValue<int>("LineLength");
        sb.AppendLine(new string('-', lineLenght));
    }
}