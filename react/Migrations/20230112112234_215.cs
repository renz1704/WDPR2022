using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _215 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "Payment");

            migrationBuilder.AddColumn<bool>(
                name: "succes",
                table: "Payment",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "succes",
                table: "Payment");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "Payment",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
