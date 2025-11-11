using BeerWorkshop.Database.Entities;
using BeerWorkshop.Database.Entities.Devices;
using BeerWorkshop.Database.Entities.Products;
using Microsoft.EntityFrameworkCore;

namespace BeerWorkshop.Database.Contexts;

public class BeerWorkshopContext(DbContextOptions<BeerWorkshopContext> options) : DbContext(options)
{
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<ProductsInventoryEntity> ProductsInventory { get; set; }
    public DbSet<ProductsStatisticEntity> ProductsStatistic { get; set; }
    public DbSet<DeletedProductsStatisticEntity> DeletedProductsStatistics { get; set; }

    public DbSet<DeviceEntity> Devices { get; set; }
    public DbSet<DevicesInventoryEntity> DevicesInventory { get; set; }
    public DbSet<DevicesStatisticEntity> DevicesStatistic { get; set; }
    public DbSet<DeletedDevicesStatisticEntity> DeletedDevicesStatistics { get; set; }

    public DbSet<CheckEntity> Checks { get; set; }
}