using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using react.Models;

namespace react.Data;

public class TicketContext : ApiAuthorizationDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {

    }
    
    public DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Ticket>().ToTable("Ticket");
    }

    public OnCreate(){
        // Create a new ticket
        Ticket ticket = new Ticket();
        ticket.isAvailable = true;
        ticket.Date = DateTime.Now;
        ticket.Show = new Show();
        ticket.Show.Name = "The Lion King";
        ticket.Show.Description = "The Lion King is a musical based on the 1994 Disney animated film of the same name with music by Elton John and lyrics by Tim Rice along with the musical score created by Hans Zimmer with choral arrangements by Lebo M. Directed by Julie Taymor, the musical features actors in animal costumes as well as giant, hollow puppets.";
        ticket.Show.Prices = new int[] { 10, 20, 30, 40, 50 };
        ticket.Show.Tickets = new int[] { 10, 20, 30, 40, 50 };
        ticket.Seat = new Seat();
        ticket.Seat.SeatNumber = 1;
        ticket.Seat.Type = "VIP";
        ticket.Seat.isAvailable = true;
        // Add the ticket to the database
        Tickets.Add(ticket);
        // Save the changes
        SaveChanges();
    }


}
