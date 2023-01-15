using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{

    ITheaterDbContext _context;

    public DonationController(ITheaterDbContext context)
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