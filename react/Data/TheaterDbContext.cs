using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using react.Models;

public class TheaterDbContext : IdentityDbContext {
	public TheaterDbContext(DbContextOptions<TheaterDbContext> options) : base(options)
	{

	}

    public DbSet<Donation> Donations { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Payment> Payment { get; set; }
    public DbSet<Performance> Performances { get; set; }
    public DbSet<Rank> Ranks { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Row> Rows { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<Show> Shows { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Actor> Actors { get; set; }
	public DbSet<Employee> Employees { get; set; }	
    public DbSet<Visitor> Visitors { get; set; }

}