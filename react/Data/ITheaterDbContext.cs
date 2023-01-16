using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public interface ITheaterDbContext
{
    DbSet<Donation> Donations { get; set; }
    DbSet<Genre> Genres { get; set; }
    DbSet<Group> Groups { get; set; }
    DbSet<Payment> Payment { get; set; }
    DbSet<Performance> Performances { get; set; }
    DbSet<Reservation> Reservations { get; set; }
    DbSet<Room> Rooms { get; set; }
    DbSet<Row> Rows { get; set; }
    DbSet<Seat> Seats { get; set; }
    DbSet<Show> Shows { get; set; }
    DbSet<Ticket> Tickets { get; set; }
    DbSet<Actor> Actors { get; set; }
    DbSet<Employee> Employees { get; set; }
    DbSet<Visitor> Visitors { get; set; }

    int SaveChanges();
    //Task SaveChangesAsync();

    void Update<T>(T entity) where T : class;
}