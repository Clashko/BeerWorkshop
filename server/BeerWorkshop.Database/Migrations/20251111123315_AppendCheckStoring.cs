using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class AppendCheckStoring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CheckId",
                table: "ProductsStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CheckId",
                table: "DevicesStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CheckId",
                table: "DeletedProductsStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CheckId",
                table: "DeletedDevicesStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Checks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Path = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checks", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductsStatistic_CheckId",
                table: "ProductsStatistic",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_DevicesStatistic_CheckId",
                table: "DevicesStatistic",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_DeletedProductsStatistics_CheckId",
                table: "DeletedProductsStatistics",
                column: "CheckId");

            migrationBuilder.CreateIndex(
                name: "IX_DeletedDevicesStatistics_CheckId",
                table: "DeletedDevicesStatistics",
                column: "CheckId");

            migrationBuilder.AddForeignKey(
                name: "FK_DeletedDevicesStatistics_Checks_CheckId",
                table: "DeletedDevicesStatistics",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeletedProductsStatistics_Checks_CheckId",
                table: "DeletedProductsStatistics",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DevicesStatistic_Checks_CheckId",
                table: "DevicesStatistic",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DeletedDevicesStatistics_Checks_CheckId",
                table: "DeletedDevicesStatistics");

            migrationBuilder.DropForeignKey(
                name: "FK_DeletedProductsStatistics_Checks_CheckId",
                table: "DeletedProductsStatistics");

            migrationBuilder.DropForeignKey(
                name: "FK_DevicesStatistic_Checks_CheckId",
                table: "DevicesStatistic");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic");

            migrationBuilder.DropTable(
                name: "Checks");

            migrationBuilder.DropIndex(
                name: "IX_ProductsStatistic_CheckId",
                table: "ProductsStatistic");

            migrationBuilder.DropIndex(
                name: "IX_DevicesStatistic_CheckId",
                table: "DevicesStatistic");

            migrationBuilder.DropIndex(
                name: "IX_DeletedProductsStatistics_CheckId",
                table: "DeletedProductsStatistics");

            migrationBuilder.DropIndex(
                name: "IX_DeletedDevicesStatistics_CheckId",
                table: "DeletedDevicesStatistics");

            migrationBuilder.DropColumn(
                name: "CheckId",
                table: "ProductsStatistic");

            migrationBuilder.DropColumn(
                name: "CheckId",
                table: "DevicesStatistic");

            migrationBuilder.DropColumn(
                name: "CheckId",
                table: "DeletedProductsStatistics");

            migrationBuilder.DropColumn(
                name: "CheckId",
                table: "DeletedDevicesStatistics");
        }
    }
}
