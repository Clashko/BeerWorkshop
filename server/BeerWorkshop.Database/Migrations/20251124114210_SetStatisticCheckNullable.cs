using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class SetStatisticCheckNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic");

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "ProductsStatistic",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic");

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "ProductsStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductsStatistic_Checks_CheckId",
                table: "ProductsStatistic",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
