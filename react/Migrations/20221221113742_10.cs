using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace react.Migrations
{
    /// <inheritdoc />
    public partial class _10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artiesten_Groepen_GroupId",
                table: "Artiesten");

            migrationBuilder.DropIndex(
                name: "IX_Artiesten_GroupId",
                table: "Artiesten");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "Artiesten");

            migrationBuilder.CreateTable(
                name: "ArtistGroup",
                columns: table => new
                {
                    Artistsid = table.Column<int>(type: "INTEGER", nullable: false),
                    GroupsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistGroup", x => new { x.Artistsid, x.GroupsId });
                    table.ForeignKey(
                        name: "FK_ArtistGroup_Artiesten_Artistsid",
                        column: x => x.Artistsid,
                        principalTable: "Artiesten",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ArtistGroup_Groepen_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "Groepen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtistGroup_GroupsId",
                table: "ArtistGroup",
                column: "GroupsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtistGroup");

            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "Artiesten",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Artiesten_GroupId",
                table: "Artiesten",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artiesten_Groepen_GroupId",
                table: "Artiesten",
                column: "GroupId",
                principalTable: "Groepen",
                principalColumn: "Id");
        }
    }
}
