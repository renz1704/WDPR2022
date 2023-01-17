using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "SeatName",
                table: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "RowId",
                table: "Seats",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "RowNumber",
                table: "Seats",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeatNumber",
                table: "Seats",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats",
                column: "RowId",
                principalTable: "Rows",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "RowNumber",
                table: "Seats");

            migrationBuilder.DropColumn(
                name: "SeatNumber",
                table: "Seats");

            migrationBuilder.AlterColumn<int>(
                name: "RowId",
                table: "Seats",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SeatName",
                table: "Seats",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats",
                column: "RowId",
                principalTable: "Rows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
