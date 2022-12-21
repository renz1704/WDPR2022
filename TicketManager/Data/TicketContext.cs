using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace TicketManager.Data;
    public class TicketContext : DbContext
{
    public DbSet<Ticket> Ticket { get; set; }
    public TicketContext(DbContextOptions<TicketContext> options)
        : base(options)
    {
    }
}


    // protected override void OnModelCreating(ModelBuilder builder)
    // {
    //     base.OnModelCreating(builder);
    //     builder.Entity<Ticket>().ToTable("Ticket");
    // }

