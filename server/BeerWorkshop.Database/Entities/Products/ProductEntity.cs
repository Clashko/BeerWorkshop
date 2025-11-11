using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BeerWorkshop.Database.Enums;

namespace BeerWorkshop.Database.Entities.Products;

public class ProductEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    
    public ProductType ProductType { get; set; }
    public UnitOfMeasure UnitOfMeasure { get; set; }

    public ICollection<ProductsInventoryEntity> Inventory { get; set; } = [];
    public ICollection<ProductsStatisticEntity> Statistics { get; set; } = [];
}