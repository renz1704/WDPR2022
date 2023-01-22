using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{

    ITheaterDbContext _context;

    public ReservationController(ITheaterDbContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    [Route("createreservation")]
    public async Task<ActionResult<Reservation>> CreateReservationAsync(int userId, List<int> ticketIds)
    {
        var tickets = await _context.Tickets
            .Where(t => ticketIds.Contains(t.Id))
            .ToListAsync();

        if (tickets.Count != ticketIds.Count)
        {
            return BadRequest("One or more of the provided ticket IDs are invalid.");
        }

        var user = await _context.Visitors.FindAsync(userId);

        if (user == null)
        {
            return NotFound("The provided user ID is invalid.");
        }

        var reservation = new Reservation { Visitor = user, Tickets = tickets };

        _context.Reservations.Add(reservation);
        _context.SaveChanges();

        return reservation;
    }

}