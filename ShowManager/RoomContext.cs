using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class RoomContext : DbContext
{
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Row> Rows { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public RoomContext (DbContextOptions<RoomContext> options)
        : base(options)
    {
    }
}