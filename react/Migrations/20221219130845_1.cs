using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groepen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groepen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Artiesten",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    GroupId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artiesten", x => x.id);
                    table.ForeignKey(
                        name: "FK_Artiesten_Groepen_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groepen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artiesten_GroupId",
                table: "Artiesten",
                column: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Artiesten");

            migrationBuilder.DropTable(
                name: "Groepen");
        }
    }
}
