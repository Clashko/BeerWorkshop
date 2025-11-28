using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddProductTypeToStatistic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductType",
                table: "DeletedProductsStatistics",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductType",
                table: "DeletedProductsStatistics");
        }
    }
}
