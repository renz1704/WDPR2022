using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

//De userManager kan gebruikt worden om de rollen toe te kennen.

namespace react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        TheaterDbContext _context;

        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, TheaterDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }
        // [HttpPost]
        // [Route("login")]
        // public async Task<IActionResult> Login([FromBody] LoginDTO model)
        // {
        //     var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

        //     if (result.Succeeded)
        //     {
        //         return Ok();
        //     }

        //     return Unauthorized();
        // }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var _user = await _userManager.FindByNameAsync(model.Email);
            if (_user != null)
                if (await _userManager.CheckPasswordAsync(_user, model.Password))
                {
                    var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));

                    var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                    var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.Email) };
                    var roles = await _userManager.GetRolesAsync(_user);
                    foreach (var role in roles)
                        claims.Add(new Claim(ClaimTypes.Role, role));
                    var tokenOptions = new JwtSecurityToken
                    (
                        issuer: "https://localhost:7293",
                        audience: "https://localhost:7293",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(10),
                        signingCredentials: signingCredentials
                    );
                    return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
                }

            return Unauthorized();
        }
        [HttpPost]
        [Route("registreer")]
        public async Task<ActionResult> Registreer([FromBody] RegisterDTO model)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };

            var resultaat = await _userManager.CreateAsync(user, model.Password);
            var addToVisitor = new Visitor();
            addToVisitor.IdentityUser = user;
            _context.Visitors.Add(addToVisitor);
            _context.SaveChanges();

            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);

        }

        [HttpGet]
        [Route("userExists/{email}")]
        public async Task<ActionResult<String>> userExists(String email)
        {

            var newuser = new IdentityUser { UserName = "hallo@hallo.nl", Email = "hallo@hallo.nl" };

            var resultaat = await _userManager.CreateAsync(newuser, "Hallo123!");
            var addToVisitor = new Visitor();
            addToVisitor.IdentityUser = newuser;

            _context.Visitors.Add(addToVisitor);
            _context.SaveChanges();

            var user = _context.Visitors.Any(x => x.IdentityUser.Email == email);
            Console.WriteLine(user);
            // Check if the user exists in the database
            if (user == false)
            {
                return NotFound();
            }

            // Return the email
            return email;
        }

        //DEZE FIXEN! 

        //email checken of hij bestaat en dan opjecten showen in react.




        //     [HttpGet]
        // public async Task<string> GetCurrentUserId()
        // {
        // 	ApplicationUser usr = await GetCurrentUserAsync();
        // 	return usr?.Id;
        // }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string donationToken { get; set; }
    }
}
