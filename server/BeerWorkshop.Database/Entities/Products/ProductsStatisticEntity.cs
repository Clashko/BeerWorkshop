using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Database.Entities.Products;

public class ProductsStatisticEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public TransactionType TransactionType { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public string? Discount { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime TransactionDate { get; set; }

    public Guid ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    public Guid CheckId { get; set; }
    public CheckEntity Check { get; set; } = null!;
}