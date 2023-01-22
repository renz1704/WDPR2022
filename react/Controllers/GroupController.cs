using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{

    TheaterDbContext _context;

    public GroupController(TheaterDbContext groupContext)
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


    [HttpPost]
    [Route("createartist")]
    public async Task<ActionResult<Actor>> createArtist([FromBody] Actor a)
    {
        await _context.Actors.AddAsync(a);
        _context.SaveChanges();
        Console.WriteLine(a.Name + " " + a.LastName + ": is created ");
        return a;
    }

    [HttpDelete]
    [Route("deleteGroup")]
    public async Task<ActionResult<Group>> deleteGroup (int id)
    {

        Group deletedGroup = await _context.Groups.FindAsync(id);

        _context.Groups.Remove(deletedGroup);
        await _context.SaveChangesAsync();
        return deletedGroup;
    }

    [HttpPost]
    [Route("addToShow")]
    public async Task<ActionResult<Group>> addToShow (AddToGoupDTO add)
    {
        Show show = await _context.Shows.FindAsync(add.showId);
        Group group = await _context.Groups.FindAsync(add.groupId);
        show.Groups.Add(group);
        await _context.SaveChangesAsync();
        return group;
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



    public class AddToGoupDTO{
        public int groupId {get;set;}
        public int showId {get;set;}
    }
}