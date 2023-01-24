using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



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
    public virtual DbSet<Payment> Payments { get; set; }
    public virtual DbSet<Performance> Performances { get; set; }
    public virtual DbSet<Reservation> Reservations { get; set; }
    public virtual DbSet<Room> Rooms { get; set; }
    public virtual DbSet<Row> Rows { get; set; }
    public virtual DbSet<Seat> Seats { get; set; }
    public virtual DbSet<Show> Shows { get; set; }
    public virtual DbSet<Ticket> Tickets { get; set; }
    public virtual DbSet<TransferedTicket> TransferedTickets { get; set; }
    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Employee> Employees { get; set; }
    public virtual DbSet<Visitor> Visitors { get; set; }
    public virtual DbSet<Test> Tests { get; set; }


    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityUserLogin<int>>().HasNoKey();


        modelBuilder.Entity<Room>()
            .HasMany(r => r.Rows)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Row>()
            .HasMany(r => r.Seats)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

        // on delete ticket
        modelBuilder.Entity<Ticket>()
            .HasOne(f => f.Seat)
            .WithOne()
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction)
            .HasForeignKey<Ticket>(s => s.SeatId);

        modelBuilder.Entity<TransferedTicket>()
            .HasOne(f => f.Seat)
            .WithOne()
            .OnDelete(DeleteBehavior.NoAction)
            .HasForeignKey<TransferedTicket>(s => s.SeatId);
    }

   


}