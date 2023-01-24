using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;



[Route("api/[controller]")]
[ApiController]
public class ActorController : ControllerBase
{
    private readonly TheaterDbContext _context;

    public ActorController(TheaterDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("getActors")]
    public async Task<ActionResult<List<Actor>>> getAll () {
        return _context.Actors.OrderBy(a => a.Name).ToList();
    }

    private IdentityUser createIdentityUser(){
        return new IdentityUser();
    }

    [HttpPost]
    [Route("createActor")]
    public async Task<ActionResult<Actor>> Create (CreateDTO actor) 
    {
        Actor insertActor = new Actor{Name = actor.Name, LastName= actor.Lastname, StageName = actor.Stagename};
        await _context.Actors.AddAsync(insertActor);
        await _context.SaveChangesAsync();
        return insertActor;
    }

    [HttpDelete]
    [Route("deleteActor")]
    public async Task<ActionResult<Actor>> Delete (int id){
        Actor deleteActor = await _context.Actors.FindAsync(id);
        _context.Actors.Remove(deleteActor);
        await _context.SaveChangesAsync();
        return deleteActor;
    }

    public class CreateDTO{
        public string Name {get;set;}
        public string Lastname {get;set;}
        public string? Stagename {get;set;}
    }

}