using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class ChangeVatNameToProductsAndDevices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchaceVat",
                table: "ProductsInventory",
                newName: "PurchaseVat");

            migrationBuilder.RenameColumn(
                name: "PurchaceVat",
                table: "DevicesInventory",
                newName: "PurchaseVat");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchaseVat",
                table: "ProductsInventory",
                newName: "PurchaceVat");

            migrationBuilder.RenameColumn(
                name: "PurchaseVat",
                table: "DevicesInventory",
                newName: "PurchaceVat");
        }
    }
}
