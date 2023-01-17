using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class TheaterDbContext : IdentityDbContext, ITheaterDbContext
{
    public TheaterDbContext(DbContextOptions<TheaterDbContext> options) : base(options) { }

	public void Update<T>(T entity) where T : class
    {
        Entry(entity).State = EntityState.Modified;
    }

    public virtual DbSet<Donation> Donations { get; set; }
    public virtual DbSet<Genre> Genres { get; set; }
    public virtual DbSet<Group> Groups { get; set; }
    public virtual DbSet<Payment> Payment { get; set; }
    public virtual DbSet<Performance> Performances { get; set; }
    public virtual DbSet<Reservation> Reservations { get; set; }
    public virtual DbSet<Room> Rooms { get; set; }
    public virtual DbSet<Row> Rows { get; set; }
    public virtual DbSet<Seat> Seats { get; set; }
    public virtual DbSet<Show> Shows { get; set; }
    public virtual DbSet<Ticket> Tickets { get; set; }
    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Visitor> Visitors { get; set; }
    
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        return base.SaveChangesAsync(cancellationToken);
    }

}