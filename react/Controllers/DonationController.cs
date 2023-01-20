using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{

    private readonly UserManager<IdentityUser> _userManager;

    ITheaterDbContext _context;

    public DonationController(TheaterDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }


    private String getEmailFromToken(string tokenUser)
    {

        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtToken = tokenHandler.ReadJwtToken(tokenUser);
        var emailUser = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;

        return emailUser;

    }

    [HttpPost]
    [Route("addtokenuser")]
    public async Task<IActionResult> addTokenUser([FromQuery] string tokenUser, [FromForm] string token)
    {

        string emailUser = getEmailFromToken(tokenUser);

        if (string.IsNullOrEmpty(emailUser))
            return BadRequest(new { message = "emailUser is null or empty" });

        var user = _context.Visitors.FirstOrDefault(x => x.IdentityUser.UserName == emailUser);
        if (user == null)
            return BadRequest(new { message = "Er is geen gebruiker gevonden met dit emailadres!" });

        user.DonationToken = token;
        _context.SaveChanges();
        Console.WriteLine(token);

        Console.WriteLine("De token van de user " + user.Name + " = " + user.DonationToken);

        return Ok(new { message = "Gelukt, u kunt dit venster nu sluiten." });

    }

    [HttpGet]
    [Route("getDonationTokenUser")]
    public async Task <ActionResult<String>> getDonationTokenUser([FromQuery] string email)
    {

        var _user = await _userManager.FindByEmailAsync(email);
        var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == _user.Id).FirstOrDefaultAsync();

        string donationToken = (visitor.DonationToken);

        return donationToken;
        // return new TokenDTO{token = visitor.DonationToken};
    }


    [HttpPost]
    [Route("DonatieListener")]
    public async Task<ActionResult<donationListener>> DonatieListener([FromBody] donationListener donationListenerModel)
    {

        var _user = await _userManager.FindByEmailAsync(donationListenerModel.email);
        if (_user == null) return Unauthorized();

        var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == _user.Id).FirstOrDefaultAsync();


        visitor.Donations.Add(new Donation(visitor.Id, donationListenerModel.amount));
        _context.SaveChanges();


        Console.WriteLine(donationListenerModel.email + donationListenerModel.amount + donationListenerModel.naam);

        return donationListenerModel;

    }

}

public class TokenDTO {
    public string token {get;set;}
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