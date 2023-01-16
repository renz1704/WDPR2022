using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PerformanceController : ControllerBase
{
    ITheaterDbContext _context;

    public PerformanceController(ITheaterDbContext context){
        _context = context;
    }


    [HttpGet]
    [Route("performances")]
    public async Task<ActionResult<List<Performance>>> GetAllAsync() {
        return await Task.Run( () => {return _context.Performances.Include(p => p.Show).Include(p => p.Show.Genres).ToList();});
    }

    [HttpPost]
    [Route("createperformance")]
    public async Task<ActionResult<Performance>> CreatePerformanceAsync(PerformanceDTO performance)
    {
        Performance p = new Performance(performance.showId, performance.roomId);
        p.StartTime = performance.StartTime;
        p.EndTime = performance.EndTime;
        await _context.Performances.AddAsync(p);
        _context.SaveChanges();
        return p;
    }

    [HttpGet]
    [Route("getPerformancesFilteredGenres")]
    public async Task<ActionResult<List<Performance>>> getPerformancesFilteredGenre(string genre){
        return _context.Performances.Where(p => p.Show.Genres.Any(g => g.GenreName == genre)).Include(p => p.Show).Include(p => p.Show.Genres).ToList();
    }



}


public class PerformanceDTO{
        public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int showId{get;set;}
    public int roomId{get;set;}
}