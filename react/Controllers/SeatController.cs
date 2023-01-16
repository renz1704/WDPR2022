using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class SeatController : Controller
{
    private readonly ITheaterDbContext _context;
    public SeatController(ITheaterDbContext context)
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
    
    [HttpPost]
    [Route ("createSeat")]
    public IActionResult Post([FromBody]Seat seat)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _context.Seats.Add(seat);
        _context.SaveChanges();
        return CreatedAtAction("Get", new { id = seat.Id }, seat);
    }
}