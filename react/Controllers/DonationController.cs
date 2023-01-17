using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{

    private readonly UserManager<IdentityUser> _userManager;
    TheaterDbContext _context;
    private string emailUser;

    public DonationController(TheaterDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    [Route("userEmailExists")]
    public async Task<ActionResult<Boolean>> userEmailExists()
    {
        if (emailUser == null)
        {
            return false;
        }
        Console.WriteLine(emailUser);
        return true;
    }


    private Boolean tokenExists(string email)
    {
        var user = _context.Visitors.FirstOrDefault(x => x.IdentityUser.UserName == email);
        if (user == null)
            return false;
        if (user.DonationToken != null)
        {
            return true;
        }
        return false;
    }


    [HttpPost]
    [Route("addtokenuser")]
    public async Task<IActionResult> addTokenUser([FromForm] String token)
    {

        if (string.IsNullOrEmpty(emailUser))
            return BadRequest(new { message = "emailUser is null or empty" });

        var user = _context.Visitors.FirstOrDefault(x => x.IdentityUser.UserName == emailUser);
        if (user == null)
            return BadRequest(new { message = "Er is geen gebruiker gevonden met dit emailadres!" });

        user.DonationToken = token;

        Console.WriteLine(token);

        Console.WriteLine("De token van de user " + user.Name + " = " + user.DonationToken);

        return Ok(new { message = "Gelukt, u kunt dit venster nu sluiten." });
    }

    [HttpPost]
    [Route("DonatieListener")]
    public async Task<ActionResult<donationListener>> DonatieListener([FromBody] donationListener donationListenerModel)
    {
        var _user = await _userManager.FindByEmailAsync(donationListenerModel.email);
        if (_user == null) return Unauthorized();

        var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == _user.Id).FirstOrDefaultAsync();

        
        visitor.Donations.Add(new Donation(visitor.Id, donationListenerModel.amount));
        await _context.SaveChangesAsync();


        Console.WriteLine(donationListenerModel.email + donationListenerModel.amount + donationListenerModel.naam);

        return donationListenerModel;

    }

}

public class donationTokenModel
{
    public string token { get; set; }

}

public class donationListener
{
    public String email { get; set; }
    public Double amount { get; set; }
    public String naam { get; set; }
}