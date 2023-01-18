using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Rooms_RoomId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats");

            migrationBuilder.CreateTable(
                name: "IdentityUserLogin<int>",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: true),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: true),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Rooms_RoomId",
                table: "Rows",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats",
                column: "RowId",
                principalTable: "Rows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rows_Rooms_RoomId",
                table: "Rows");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats");

            migrationBuilder.DropTable(
                name: "IdentityUserLogin<int>");

            migrationBuilder.AddForeignKey(
                name: "FK_Rows_Rooms_RoomId",
                table: "Rows",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Rows_RowId",
                table: "Seats",
                column: "RowId",
                principalTable: "Rows",
                principalColumn: "Id");
        }
    }
}
