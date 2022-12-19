using Microsoft.AspNetCore.Mvc;
using react.Data;

[Route("api/[controller]")]
[ApiController]
public class GroupController : ControllerBase
{

    ApplicationDbContext _groupContext;

    public GroupController(ApplicationDbContext groupContext)
    {
        _groupContext = groupContext;
    }
    
    [HttpPost]
    [Route("creategroup")]
    public async Task<ActionResult<Group>> createGroup ([FromBody] Group g){
        await _groupContext.groups.AddAsync(g);
        return g;
    }


    [HttpPost]
    [Route("createartist")]
    public async Task<ActionResult<Artist>> createArtist ([FromBody] Artist a)
    {
        await _groupContext.Artists.AddAsync(a);
        return a;
    }


    private async Task<Artist> findArtist(int id)
    {
        return await _groupContext.Artists.FindAsync(id);        
    }

    private async Task<Group> findGroup(int id)
    {
        return await _groupContext.groups.FindAsync(id);
    }


    [HttpPost]
    [Route("addtogroup")]
    public async Task addToGroup (int artistId, int groupId)
    {
        Group g = await findGroup(groupId);
        g.Artists.Add(await findArtist(artistId));
    }
}