using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{

    GroupDbContext _groupContext;

    public GroupController(GroupDbContext groupContext)
    {
        _groupContext = groupContext;
    }
    
    [HttpPost]
    [Route("creategroup")]
    public async Task<ActionResult<Group>> createGroup ([FromBody] Group g){
        await _groupContext.Groepen.AddAsync(g);
        await _groupContext.SaveChangesAsync();
        return g;
    }

    [HttpGet]
    [Route("test")]
    public async Task<ActionResult<Artist>> returnArtists ()
    {
        return new Artist {FirstName = "Rashid", LastName = "Meda"};
    }


    [HttpPost]
    [Route("createartist")]
    public async Task<ActionResult<Artist>> createArtist ([FromBody] Artist a)
    {
        await _groupContext.Artiesten.AddAsync(a);
        await _groupContext.SaveChangesAsync();
        Console.WriteLine(a.FirstName + " " + a.LastName + ": is created ");
        return a;
    }


    private async Task<Artist> findArtist(int id)
    {
        return await _groupContext.Artiesten.FindAsync(id);        
    }

    private async Task<Group> findGroup(int id)
    {
        return await _groupContext.Groepen.FindAsync(id);
    }


    [HttpPost]
    [Route("addtogroup")]
    public async Task addToGroup (int artistId, int groupId)
    {
        Group g = await findGroup(groupId);
        g.Artists.Add(await findArtist(artistId));
        await _groupContext.SaveChangesAsync();
    }
}