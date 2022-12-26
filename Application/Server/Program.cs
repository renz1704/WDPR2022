using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<TheaterDbContext>(options => options.UseLazyLoadingProxies()
.UseSqlite("Data source=Laak.db"));

builder.Services.AddIdentity<IdentityUser, IdentityRole>( options =>
{
    
})
    .AddEntityFrameworkStores<TheaterDbContext>();

builder.Services.AddIdentityCore<Visitor>().AddEntityFrameworkStores<TheaterDbContext>();
builder.Services.AddIdentityCore<Employee>().AddEntityFrameworkStores<TheaterDbContext>();
builder.Services.AddIdentityCore<Actor>().AddEntityFrameworkStores<TheaterDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
