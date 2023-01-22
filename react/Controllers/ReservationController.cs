using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ReservationController : ControllerBase
{

    private readonly TheaterDbContext _context;

    public ReservationController(TheaterDbContext context)
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
    
    [HttpGet]
    [Route("getreservations/{userId}")]
    public async Task<ActionResult<List<Reservation>>> GetReservationsWithoutPaymentIdAsync(int userId)
    {
        var reservations = await _context.Reservations
            .Include(r => r.Visitor)
            .Include(r => r.Tickets)
            .ThenInclude(t => t.Performance)
            .Where(r => r.Visitor.Id == userId && r.Payment == null)
            .ToListAsync();
        
        if (reservations == null)
        {
            return NotFound("No reservations found for the provided user ID.");
        }

        return reservations;
    }
    
    [HttpDelete]
    [Route("removereservation/{reservationId}")]
    public async Task<IActionResult> RemoveReservationAsync(int reservationId)
    {
        var reservation = await _context.Reservations
            .Include(r => r.Tickets)
            .SingleOrDefaultAsync(r => r.Id == reservationId);

        if (reservation == null)
        {
            return NotFound("The provided reservation ID is invalid.");
        }

        _context.Reservations.Remove(reservation);
        _context.Tickets.RemoveRange(reservation.Tickets);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut]
    [Route("addpaymenttoreservation/{reservationId}/{paymentId}")]
    public async Task<IActionResult> AddPaymentToReservationAsync(int reservationId, int paymentId)
    {
        var reservation = await _context.Reservations
            .Include(r => r.Payment)
            .SingleOrDefaultAsync(r => r.Id == reservationId);
        if (reservation == null)
        {
            return NotFound("The provided reservation ID is invalid.");
        }

        var payment = await _context.Payments.FindAsync(paymentId);

        if (payment == null)
        {
            return NotFound("The provided payment ID is invalid.");
        }

        reservation.Payment = payment;
        await _context.SaveChangesAsync();

        return Ok();
    }



}