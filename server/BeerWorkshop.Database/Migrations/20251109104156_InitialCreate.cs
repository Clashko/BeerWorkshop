using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations;

/// <inheritdoc />
public partial class InitialCreate : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "DeletedDevicesStatistics",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                DeviceName = table.Column<string>(type: "TEXT", nullable: false),
                TransactionType = table.Column<int>(type: "INTEGER", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DeletedDevicesStatistics", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "DeletedProductsStatistics",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                ProductName = table.Column<string>(type: "TEXT", nullable: false),
                TransactionType = table.Column<int>(type: "INTEGER", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DeletedProductsStatistics", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Devices",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                Name = table.Column<string>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Devices", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Products",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                Name = table.Column<string>(type: "TEXT", nullable: false),
                ProductType = table.Column<int>(type: "INTEGER", nullable: false),
                UnitOfMeasure = table.Column<int>(type: "INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Products", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "DevicesInventory",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                IncomingDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                PurchasePrice = table.Column<decimal>(type: "TEXT", nullable: false),
                RetailPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                DeviceId = table.Column<Guid>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DevicesInventory", x => x.Id);
                table.ForeignKey(
                    name: "FK_DevicesInventory_Devices_DeviceId",
                    column: x => x.DeviceId,
                    principalTable: "Devices",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "DevicesStatistic",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                TransactionType = table.Column<int>(type: "INTEGER", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                DeviceId = table.Column<Guid>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_DevicesStatistic", x => x.Id);
                table.ForeignKey(
                    name: "FK_DevicesStatistic_Devices_DeviceId",
                    column: x => x.DeviceId,
                    principalTable: "Devices",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "ProductsInventory",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                IncomingDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                PurchasePrice = table.Column<decimal>(type: "TEXT", nullable: false),
                RetailPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                ManufactureDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                ExpirationTime = table.Column<int>(type: "INTEGER", nullable: false),
                ExpirationMeasure = table.Column<int>(type: "INTEGER", nullable: false),
                ProductId = table.Column<Guid>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ProductsInventory", x => x.Id);
                table.ForeignKey(
                    name: "FK_ProductsInventory_Products_ProductId",
                    column: x => x.ProductId,
                    principalTable: "Products",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "ProductsStatistic",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "TEXT", nullable: false),
                TransactionType = table.Column<int>(type: "INTEGER", nullable: false),
                Quantity = table.Column<decimal>(type: "TEXT", nullable: false),
                TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                ProductId = table.Column<Guid>(type: "TEXT", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ProductsStatistic", x => x.Id);
                table.ForeignKey(
                    name: "FK_ProductsStatistic_Products_ProductId",
                    column: x => x.ProductId,
                    principalTable: "Products",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_DevicesInventory_DeviceId",
            table: "DevicesInventory",
            column: "DeviceId");

        migrationBuilder.CreateIndex(
            name: "IX_DevicesStatistic_DeviceId",
            table: "DevicesStatistic",
            column: "DeviceId");

        migrationBuilder.CreateIndex(
            name: "IX_ProductsInventory_ProductId",
            table: "ProductsInventory",
            column: "ProductId");

        migrationBuilder.CreateIndex(
            name: "IX_ProductsStatistic_ProductId",
            table: "ProductsStatistic",
            column: "ProductId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "DeletedDevicesStatistics");

        migrationBuilder.DropTable(
            name: "DeletedProductsStatistics");

        migrationBuilder.DropTable(
            name: "DevicesInventory");

        migrationBuilder.DropTable(
            name: "DevicesStatistic");

        migrationBuilder.DropTable(
            name: "ProductsInventory");

        migrationBuilder.DropTable(
            name: "ProductsStatistic");

        migrationBuilder.DropTable(
            name: "Devices");

        migrationBuilder.DropTable(
            name: "Products");
    }
}
