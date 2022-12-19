using Microsoft.EntityFrameworkCore;

public class GroupDbContext : DbContext{
    
            public GroupDbContext (DbContextOptions<GroupDbContext> options)
            : base(options)
        {
        }
    public DbSet<Group> Groepen {get;set;}
    public DbSet<Artist> Artiesten {get;set;}
}