using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using react.Models;

namespace react.Data;

public class UserDbContext : DbContext {

            public UserDbContext (DbContextOptions<UserDbContext> options)
            : base(options)
    {
    }
    public DbSet<User> Users {get; set;}
    // public DbSet<Login> Login {get; set;}
    // public DbSet<Register> Registreren {get; set;}

    // public DbSet<Response> Response {get; set;}
}
