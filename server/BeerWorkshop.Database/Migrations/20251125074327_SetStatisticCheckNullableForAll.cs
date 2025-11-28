using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeerWorkshop.Database.Migrations
{
    /// <inheritdoc />
    public partial class SetStatisticCheckNullableForAll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DevicesStatistic",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DeletedProductsStatistics",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DeletedDevicesStatistics",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_DeletedDevicesStatistics_Checks_CheckId",
                table: "DeletedDevicesStatistics",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DeletedProductsStatistics_Checks_CheckId",
                table: "DeletedProductsStatistics",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DevicesStatistic_Checks_CheckId",
                table: "DevicesStatistic",
                column: "CheckId",
                principalTable: "Checks",
                principalColumn: "Id");
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

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DevicesStatistic",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DeletedProductsStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CheckId",
                table: "DeletedDevicesStatistics",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

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
        }
    }
}
