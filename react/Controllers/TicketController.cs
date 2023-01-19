using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;




[ApiController]
[Route("api/[controller]")]

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

    [HttpPost]
    [Route("createticket")]
    public IActionResult CreateTicket([FromBody] TicketDTO ticketDto)
    {
        Console.WriteLine(ticketDto);
        var performance = _context.Performances.FirstOrDefault(p => p.Id == ticketDto.PerformanceId);
        var seat = _context.Seats.FirstOrDefault(s => s.Id == ticketDto.SeatId);
        //var reservation = _context.Reservations.FirstOrDefault(r => r.Id == ticketDto.ReservationId);


        var ticket = new Ticket
        {
            Id = ticketDto.Id,
            Price = ticketDto.Price,
            Seat = seat,
            Performance = performance,
            //Reservation = reservation,
            isTransfered = false
        };

        _context.Tickets.Add(ticket);
        _context.SaveChanges();

        return Ok(ticket);
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
        //public int ReservationId { get; set; }
        public double Price { get; set; }
        public Boolean isTransfered {get;set;}
        
    }

    /*
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

    */
    public class TicketTransferDTO
    {
        public string emailOwner { get; set; }
        public string emailReceiver { get; set; }
        public int ticketId { get; set; }
    }
}