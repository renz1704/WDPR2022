using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class PerformanceController : ControllerBase
{
    TheaterDbContext _context;

    public PerformanceController(TheaterDbContext context){
        _context = context;
    }


    [HttpGet]
    [Route("performances")]
    public async Task<ActionResult<List<Performance>>> GetAllAsync() {
        return await Task.Run( () => {return _context.Performances.ToList();});
    }

    [HttpPost]
    [Route("createperformance")]
    public async Task<ActionResult<Performance>> CreatePerformanceAsync(PerformanceDTO performance)
    {
        Performance p = new Performance(performance.showId, performance.roomId, _context);
        await _context.Performances.AddAsync(p);
        await _context.SaveChangesAsync();
        return p;
        
    }



}


public class PerformanceDTO{
        public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int showId{get;set;}
    public int roomId{get;set;}
}