using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketManager.Migrations
{
    /// <inheritdoc />
    public partial class _8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SeatId",
                table: "Tickets",
                newName: "seatId");

            migrationBuilder.RenameColumn(
                name: "Zaal",
                table: "Tickets",
                newName: "zaalId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "seatId",
                table: "Tickets",
                newName: "SeatId");

            migrationBuilder.RenameColumn(
                name: "zaalId",
                table: "Tickets",
                newName: "Zaal");
        }
    }
}
