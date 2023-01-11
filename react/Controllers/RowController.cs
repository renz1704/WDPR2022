using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RowController : Controller
{
    private readonly TheaterDbContext _context;
    public RowController(TheaterDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]   
    public IActionResult Get(int id)
    {
        var row = _context.Rows
            .SingleOrDefault(s => s.Id == id);
        if (row == null)
        {
            return NotFound();
        }
        return Ok(row);
    }
    
    [HttpPost]
    [Route ("createRow")]
    public IActionResult Post([FromBody]Row row)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        _context.Rows.Add(row);
        _context.SaveChanges();
        return CreatedAtAction("Get", new { id = row.Id }, row);
    }
}