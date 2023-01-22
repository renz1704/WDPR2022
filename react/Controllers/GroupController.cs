using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{

    ITheaterDbContext _context;

    public GroupController(ITheaterDbContext groupContext)
    {
        _context = groupContext;
    }


    [HttpGet]
    [Route("getGroups")]
    public async Task<ActionResult<List<Group>>> GetAll ()
    {
        return _context.Groups.ToList();
    }
    
    [HttpPost]
    [Route("creategroup")]
    public async Task<ActionResult<Group>> createGroup([FromBody] Group g)
    {
        await _context.Groups.AddAsync(g);
        _context.SaveChanges();
        return g;
    }

    [HttpGet]
    [Route("test")]
    public async Task<ActionResult<Actor>> returnArtists()
    {
        return new Actor { Name = "Rashid", LastName = "Meda" };
    }


    [HttpPost]
    [Route("createartist")]
    public async Task<ActionResult<Actor>> createArtist([FromBody] Actor a)
    {
        await _context.Actors.AddAsync(a);
        _context.SaveChanges();
        Console.WriteLine(a.Name + " " + a.LastName + ": is created ");
        return a;
    }


    private async Task<Actor> findArtist(int id)
    {
        return await _context.Actors.FindAsync(id);
    }

    private async Task<Group> findGroup(int id)
    {
        return await _context.Groups.FindAsync(id);
    }


    [HttpPost]
    [Route("addtogroup")]
    public async Task addToGroup(int artistId, int groupId)
    {
        Group g = await findGroup(groupId);
        g.Actors.Add(await findArtist(artistId));
        _context.SaveChanges();
    }
}