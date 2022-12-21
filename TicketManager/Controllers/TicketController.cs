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
        return Ok();
    }
}