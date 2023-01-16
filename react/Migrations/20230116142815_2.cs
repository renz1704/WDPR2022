using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Performances_PerformanceId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seats_SeatId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_PerformanceId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_SeatId",
                table: "Tickets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tickets_PerformanceId",
                table: "Tickets",
                column: "PerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SeatId",
                table: "Tickets",
                column: "SeatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Performances_PerformanceId",
                table: "Tickets",
                column: "PerformanceId",
                principalTable: "Performances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seats_SeatId",
                table: "Tickets",
                column: "SeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
