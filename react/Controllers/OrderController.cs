using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Controller]
[Route("/api/[controller]")]
public class OrderController : ControllerBase{

    private readonly TheaterDbContext _context;
    public OrderController(TheaterDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("getReservations")]
    public async Task<ActionResult<List<Reservation>>> GetReservations (string email)
    {
        return await _context.Reservations.Include(r => r.Tickets).ThenInclude(t => t.Seat).ThenInclude(s => s.Row).
        Include(r => r.Tickets).ThenInclude(t => t.Performance).
        Include(r => r.Payment).Where(r => r.Visitor.IdentityUser.Email == email).ToListAsync();
         
    }
}

