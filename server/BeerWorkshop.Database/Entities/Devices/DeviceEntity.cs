using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeerWorkshop.Database.Entities.Devices;

public class DeviceEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;

    public ICollection<DevicesInventoryEntity> Inventory { get; set; } = [];
    public ICollection<DevicesStatisticEntity> Statistics { get; set; } = [];
}