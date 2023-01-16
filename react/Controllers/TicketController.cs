using Microsoft.AspNetCore.Mvc;



[Route("api/[controller]")]
[ApiController]


public class TicketController : ControllerBase
{
    ITheaterDbContext _context;

    public TicketController(ITheaterDbContext context)
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

    // maak een ticket aan en is available op false
    [HttpPost]
    [Route("createticket")]
    public async Task<ActionResult<Ticket>> createTicket([FromBody] Ticket ticket)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Get seat met de seatid
        var seat = await _context.Seats.FindAsync(ticket.SeatId);

        // seat bestaat niet
        if (seat == null)
        {
            return BadRequest("Invalid seat ID " + ticket.SeatId);
        }

        // voeg seat toe aan de nieuwe ticket
        ticket.SeatId = seat.Id;

        // get performance met de perfomance id
        var performance = await _context.Performances.FindAsync(ticket.PerformanceId);

        // perfomormance bestaat niet
        if (performance == null)
        {
            return BadRequest("Invalid performance ID");
        }

        // voeg performance toe aan de nieuwe ticket
        ticket.PerformanceId = performance.Id;

        _context.Tickets.Add(ticket);
        _context.SaveChanges();

        return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
    }


    // verwijder een ticket
    [HttpDelete]
    [Route("deleteticket")]
    public IActionResult DeleteTicket(int id)
    {
        var ticket = _context.Tickets
        .FirstOrDefault(t => t.Id == id);
        if (ticket == null)
        {
            return NotFound();
        }
        _context.Tickets.Remove(ticket);
        _context.SaveChanges();
        return Ok(ticket);
    }

    public class TicketDTO{
        public int Id { get; set; }
        public int SeatId { get; set; }
        public int PerformanceId { get; set; }
    }
}