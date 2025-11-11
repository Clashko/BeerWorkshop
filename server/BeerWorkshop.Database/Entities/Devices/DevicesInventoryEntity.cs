using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeerWorkshop.Database.Entities.Devices;

public class DevicesInventoryEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public decimal Quantity { get; set; }
    public DateTime IncomingDate { get; set; }

    public decimal PurchasePrice { get; set; }
    public decimal RetailPrice { get; set; }

    public Guid DeviceId { get; set; }
    public DeviceEntity Device { get; set; } = null!;
}