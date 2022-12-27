using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{

    TheaterDbContext _context;

    public GroupController(TheaterDbContext groupContext)
    {
        _context = groupContext;
    }

    [HttpPost]
    [Route("creategroup")]
    public async Task<ActionResult<Group>> createGroup(Group g)
    {
        await _context.Groups.AddAsync(g);
        await _context.SaveChangesAsync();
        return g;
    }

    [HttpPost]
    [Route("createartist")]
    public async Task<ActionResult<Actor>> createArtist([FromBody] Actor a)
    {
        await _context.Actors.AddAsync(a);
        await _context.SaveChangesAsync();
        Console.WriteLine(a.Name + " " + a.LastName + ": is created ");
        return a;
    }

    [HttpGet]
    [Route("test")]
    public async Task<ActionResult<Actor>> returnArtists()
    {
        return new Actor { Name = "Rashid", LastName = "Meda" };
    }

    [HttpGet]
    [Route("getactor")]
    public async Task<ActionResult<Actor>> GetActor(int id)
    {
        return await _context.Actors.Include(a => a.Groups).Where(a => a.Id == id).FirstAsync();

    }

    [HttpGet]
    [Route("getgroup")]
    public async Task<ActionResult<Group>> GetGroup(int id)
    {
        return await _context.Groups.Include(g => g.Actors).Where(g => g.Id == id).FirstAsync();

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
        await _context.SaveChangesAsync();
    }

   
}

public class ActorDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string? StageName { get; set; }
    public virtual List<GroupDTO> Groups { get; private set; }
}

public class GroupDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? WebsiteUrl { get; set; }
    public virtual List<Show> Shows { get; private set; }
}