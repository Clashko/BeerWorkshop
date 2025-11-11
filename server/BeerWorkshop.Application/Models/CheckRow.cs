using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Application.Models
{
    public record CheckRow(string Name, UnitOfMeasure Measure, decimal Quantity, decimal Price, int? Discount = null);
}