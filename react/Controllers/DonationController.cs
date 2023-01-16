using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{


    ITheaterDbContext _context;
    string emailUser;

    public DonationController(ITheaterDbContext context)
        {
            _context = context;
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

    [HttpPost]
    [Route("userEmail")]
    public async Task<IActionResult> userEmail(string emailuser)
    {
        Console.WriteLine("hier is ie er niet " + emailUser);
        emailUser = emailuser;
        Console.WriteLine(emailUser);
        return Ok();
    }

    [HttpPost]
    [Route("tokenExists")]
    public async Task<ActionResult<Boolean>> tokenExists(string emailuser)
    {
          if (string.IsNullOrEmpty(emailUser))
            return BadRequest(new { message = "emailUser is null or empty" });
        emailUser = emailuser;
        Console.WriteLine(emailUser);
        var user = _context.Visitors.FirstOrDefault(x => x.IdentityUser.UserName == emailUser);
         if (user == null)
            return BadRequest(new { message = "Er is geen gebruiker gevonden met dit emailadres!" });
        if (user.DonationToken != null)
        {
            return true;
        }

        return false;
    }

    [HttpGet]
    [Route("getToken")]
    public async Task<ActionResult<String>> getToken(){
        
        if (string.IsNullOrEmpty(emailUser))
            return BadRequest(new { message = "emailUser is null or empty" });
             var user = _context.Visitors.FirstOrDefault(x => x.IdentityUser.UserName == emailUser);
          if (user == null)
            return BadRequest(new { message = "Er is geen gebruiker gevonden met dit emailadres!" });
        
        return user.DonationToken;
    }

    [HttpPost]
    [Route("addtokenuser")]
    public async Task<IActionResult> addTokenUser([FromBody] String token)
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