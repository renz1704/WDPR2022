using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SeatController : Controller
{
    private readonly TheaterDbContext _context;
    public SeatController(TheaterDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]   
    public IActionResult Get(int id)
    {
        var seat = _context.Seats
            .SingleOrDefault(s => s.Id == id);
        if (seat == null)
        {
            return NotFound();
        }
        return Ok(seat);
    }
}