using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{

    TheaterDbContext _context;

    public DonationController(TheaterDbContext context)
        {
            _context = context;
        }

    [HttpPost]
    [Route("addtokenuser")]
    public async Task<ActionResult<donationTokenModel>> addTokenUser(donationTokenModel d)
    {
        Console.WriteLine(d.token);
        return d;
    }

}

public class donationTokenModel{
    public string token{get; set;}
}