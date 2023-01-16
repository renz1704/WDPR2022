using Microsoft.AspNetCore.Mvc;



[ApiController]
[Route("api/[controller]")]

public class TicketController : Controller
{
    private readonly TheaterDbContext _context;

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

    // maak een ticket aan
    [HttpPost]
    public IActionResult CreateTicket(Ticket ticket)
    {
        _context.Tickets.Add(ticket);
        _context.SaveChanges();
        return Ok(ticket);
    }

    // maak meerdere tickets aan
    [HttpPost("multiple")]
    public IActionResult CreateMultipleTickets(List<Ticket> tickets)
    {
        _context.Tickets.AddRange(tickets);
        _context.SaveChanges();
        return Ok(tickets);
    }

    // verwijder een ticket
    [HttpDelete]
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

    [HttpPost]
    [Route("/transferTicket")]
    public async Task<ActionResult<Ticket>> TransferTicket (TicketTransferDTO transfer) {

        Visitor owner = await _context.Visitors.FindAsync(transfer.emailOwner);

        Visitor reveiver = await _context.Visitors.FindAsync(transfer.emailReceiver);

        if(!(owner == null || reveiver == null))
        {
            Ticket oldTicket = await _context.Tickets.FindAsync(transfer.ticketId);
            if(oldTicket != null)
            {
                Ticket ticket = new Ticket {Seat = oldTicket.Seat, Performance = oldTicket.Performance, isTransfered=true, Reservation = oldTicket.Reservation};
                
            }
            
        }

    }


    public class TicketTransferDTO{
        public string emailOwner {get;set;}
        public string emailReceiver {get;set;}
        public int ticketId {get;set;}
    }
}