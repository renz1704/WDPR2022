using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace TicketManager.Data;
    public class TicketContext : DbContext
{
    public DbSet<Ticket> Tickets { get; set; }
    public TicketContext(DbContextOptions<TicketContext> options)
        : base(options)
    {
    }
}

