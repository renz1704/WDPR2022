using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class RoomController : Controller
{
    private readonly ITheaterDbContext _context;
    public RoomController(ITheaterDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult Get()
    {
        var roomIds = _context.Rooms
            .Select(r => r.Id)
            .ToList();
        return Ok(roomIds);
    }
    
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var room = _context.Rooms
            .Include(r => r.Rows)
            .ThenInclude(row => row.Seats)
            .SingleOrDefault(r => r.Id == id);
        if (room == null)
        {
            return NotFound();
        }
        return Ok(room);
    }

    [HttpPost]
    [Route ("createRoom")]
    public IActionResult Post([FromBody]Room room)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _context.Rooms.Add(room);
        _context.SaveChanges();
        return CreatedAtAction("Get", new { id = room.Id }, room);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] Room room)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (id != room.Id)
        {
            return BadRequest();
        }
        _context.Update(room);
        _context.SaveChanges();
        return BadRequest();
    }
    
    [HttpDelete("delete/{id}")]
    public IActionResult Delete(int id)
    {
        var room = _context.Rooms
            .Include(r => r.Rows)
            .ThenInclude(row => row.Seats)
            .SingleOrDefault(r => r.Id == id);
        if (room == null)
        {
            return NotFound();
        }
        _context.Rooms.Remove(room);
        _context.SaveChanges();
        return Ok();
    }
    
    [HttpGet("name/{id}")]
    public IActionResult GetName(int id)
    {
        var room = _context.Rooms
            .SingleOrDefault(r => r.Id == id);
        if (room == null)
        {
            return NotFound();
        }
        return Ok(room.Name);
    }
}
