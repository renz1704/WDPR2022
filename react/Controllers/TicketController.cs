using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;




[ApiController]
[Route("api/[controller]")]

public class TicketController : ControllerBase
{
    ITheaterDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

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

    [HttpPost]
    [Route("transferTicket")]
    public IActionResult transferTicket([FromBody] TicketTransferDTO TicketTransferDTO)
    {
        var oldOwner = _userManager.FindByIdAsync(TicketTransferDTO.visitorIdOwner);
        var receiverIdentityUser = _userManager.FindByIdAsync(TicketTransferDTO.visitorIdReceiver);
        var receiverVisitor = _context.Visitors.FirstOrDefaultAsync(x => x.IdentityUser.Id == TicketTransferDTO.visitorIdReceiver).Result;
        var oldTicket = _context.Tickets.FirstOrDefault(t => t.Id == TicketTransferDTO.ticketId);


        var newTicket = new TransferedTicket(oldTicket, receiverVisitor);
    
        // oldTicket.setIsTransferred = true;
        //Dit nog toevoegen^

        _context.SaveChanges();
        return Ok();
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

    public class TicketTransferDTO
    {
        public string visitorIdOwner { get; set; }
        public string visitorIdReceiver { get; set; }
        public int ticketId { get; set; }
    }
}