using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DonationController : ControllerBase
{

    TheaterDbContext _context;
    string emailUser;

    public DonationController(TheaterDbContext context)
        {
            _context = context;

        }

    [HttpGet]
     [Route("userEmailExists")]
    public async Task<ActionResult<Boolean>> userEmailExists()
    {
        if(emailUser == null){
            return false;
        }
        Console.WriteLine(emailUser);
        return true;
    }

    [HttpPost]
    [Route("userEmail")]
    public async Task<ActionResult<string>> userEmail([FromBody] string emailuser)
    {
        emailUser = emailuser;
        Console.WriteLine(emailUser);
        return emailuser;
    }

    [HttpPost]
    [Route("addtokenuser")]
    public async Task<ActionResult<donationTokenModel>> addTokenUser([FromBody] donationTokenModel d)
    {
        var user = _context.Visitors.Where(x => x.IdentityUser.UserName == emailUser).First();
        user.donationToken = d.token;
        Console.WriteLine(d.token);
        Console.WriteLine("De token van de user " + user.Name + " = " + user.donationToken);
        return d;
    }

    [HttpPost]
    [Route("DonatieListener")]
    public async Task<ActionResult<donationListener>> DonatieListener ([FromBody] donationListener donationListenerModel) {

        Console.WriteLine(donationListenerModel.email + donationListenerModel.amount + donationListenerModel.naam);

        return donationListenerModel;
    }

}

public class donationTokenModel{
    public string token {get; set;}

}

public class donationListener{
    public String email {get;set;}
    public Double amount {get; set;}
    public String naam {get; set;}
}