using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class RoomContext : DbContext
{
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Row> Rows { get; set; }
    public DbSet<Seat> Seats { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Room.db");
    }
}