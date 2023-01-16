using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[Route("api/[controller]")]
[ApiController]


public class TicketController : ControllerBase
{
    TheaterDbContext _context;

    public TicketController(TheaterDbContext context)
    {
        _context = context;
    }

    // GetTicket    
    [HttpGet]
    public IActionResult GetTicket()
    {
        var ticket = _context.Tickets
        .ToList();
        return Ok(ticket);
    }

    // GetTicketById
    [HttpGet("{id}")]
    public IActionResult GetTicketById(int id)
    {
        var ticket = _context.Tickets
        .FirstOrDefault(t => t.Id == id);
        if (ticket == null)
        {
            return NotFound();
        }
        return Ok(ticket);
    }

    // verander de available van een ticket
    [HttpPut]
    public IActionResult ChangeTicket(int id)
    {
        var ticket = _context.Tickets
        .FirstOrDefault(t => t.Id == id);
        if (ticket == null)
        {
            return NotFound();
        }
        ticket.isAvailable = false;
        _context.SaveChanges();
        return Ok(ticket);
    }


    [HttpPost]
    [Route("createticketwithseatid")]
    public IActionResult CreateTicketWithSeatId(int seatId, [FromBody] TicketDTO ticketDTO)
    {
        var seat = _context.Seats.SingleOrDefault(s => s.Id == seatId);
        if (seat == null)
        {
            return NotFound();
        }

        var ticket = new Ticket
        {
            Seat = _context.Seats.Where(s => s.Id == ticketDTO.SeatId).First(),
            Performance = _context.Performances.Where(p => p.Id == ticketDTO.PerformanceId).First(),
            isAvailable = true
        };

        _context.Tickets.Add(ticket);
        _context.SaveChanges();
        return CreatedAtAction("GetTicketById", new { id = ticket.Id }, ticket);
    }

    [HttpDelete]
    [Route("deleteticketwithseatid")]
    public IActionResult DeleteTicketWithSeatId(int seatId)
    {
        var seat = _context.Seats.SingleOrDefault(s => s.Id == seatId);
        if (seat == null)
        {
            return NotFound();
        }

        var ticket = _context.Tickets.Where(t => t.Seat.Id == seatId).First();

        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        _context.SaveChanges();
        return NoContent();
    }

    public class TicketDTO
    {
        public int Id { get; set; }
        public int SeatId { get; set; }
        public int PerformanceId { get; set; }
    }
}