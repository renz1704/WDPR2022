using Microsoft.AspNetCore.Mvc;
using TicketManager.Data;

namespace TicketManager.Controllers;

[ApiController]
[Route("[controller]")]

public class TicketController : Controller
{
    private readonly TicketContext _context;

    public TicketController(TicketContext context)
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

}