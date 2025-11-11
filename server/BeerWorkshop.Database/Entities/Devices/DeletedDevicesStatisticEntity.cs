using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Database.Entities.Devices;

public class DeletedDevicesStatisticEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string DeviceName { get; set; } = string.Empty;
    public TransactionType TransactionType { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public string? Discount { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime TransactionDate { get; set; }

    public Guid CheckId { get; set; }
    public CheckEntity Check { get; set; } = null!;
}