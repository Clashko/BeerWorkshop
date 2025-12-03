using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Database.Entities.Products;

public class ProductsInventoryEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public decimal Quantity { get; set; }
    public DateTime IncomingDate { get; set; }

    public decimal PurchasePrice { get; set; }
    public decimal RetailPrice { get; set; }
    public decimal PricePerQuantity { get; set; }

    public DateTime ManufactureDate { get; set; }
    public DateTime? OpeningDate { get; set; }
    public int ExpirationTime { get; set; }
    public ExpirationMeasure ExpirationMeasure { get; set; }
    public ExpirationCountingDateType ExpirationCountingDateType { get; set; }

    public Guid ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;
}