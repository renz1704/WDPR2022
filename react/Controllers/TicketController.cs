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
    public async Task<ActionResult<Ticket>> createTicket([FromBody] TicketDTO t)
    {
        var tickets = new Ticket { Seat = _context.Seats.Where(s=> s.Id == t.SeatId).First(), Performance = _context.Performances.Where(p=> p.Id == t.PerformanceId).First(), isAvailable = true }; 
        await _context.Tickets.AddAsync(tickets);
        _context.SaveChanges();
        return tickets;
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