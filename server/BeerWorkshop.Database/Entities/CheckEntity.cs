using BeerWorkshop.Database.Entities.Devices;
using BeerWorkshop.Database.Entities.Products;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Database.Entities;

public class CheckEntity
{
    public Guid Id { get; set; }
    public int OrderNumber { get; set; }
    public decimal TotalAmount { get; set; }
    public TransactionType TransactionType { get; set; }
    public DateTime TransactionDate { get; set; }
    public string Path { get; set; } = string.Empty;

    public ICollection<ProductsStatisticEntity> ProductsStatistics { get; set; } = [];
    public ICollection<DeletedProductsStatisticEntity> DeletedProductsStatistics { get; set; } = [];
    public ICollection<DevicesStatisticEntity> DevicesStatistics { get; set; } = [];
    public ICollection<DeletedDevicesStatisticEntity> DeletedDevicesStatistics { get; set; } = [];
}