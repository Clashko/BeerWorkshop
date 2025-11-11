using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class AppendDiscountLogic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discount",
                table: "ProductsStatistic",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "ProductsStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ShortName",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discount",
                table: "DevicesStatistic",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "DevicesStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "ShortName",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discount",
                table: "DeletedProductsStatistics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "DeletedProductsStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Discount",
                table: "DeletedDevicesStatistics",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "DeletedDevicesStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "ProductsStatistic");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductsStatistic");

            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "DevicesStatistic");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "DevicesStatistic");

            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "DeletedProductsStatistics");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "DeletedProductsStatistics");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "DeletedDevicesStatistics");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "DeletedDevicesStatistics");
        }
    }
}
