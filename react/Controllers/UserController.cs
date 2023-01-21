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
        private readonly TheaterDbContext _context;

        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, TheaterDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO model){
            
                var _user = await _userManager.FindByEmailAsync(model.Email);
                if (_user == null) return Unauthorized();

            var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == _user.Id).FirstOrDefaultAsync();


            if (_user != null && visitor != null)
                if (await _userManager.CheckPasswordAsync(_user, model.Password))
                {
                    var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));
                    var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim>();
                    claims.Add(new Claim("id", visitor.Id.ToString()));
                    claims.Add(new Claim("email", _user.Email));
                    claims.Add(new Claim("firstname", visitor.Name));
                    claims.Add(new Claim("lastname", visitor.LastName));

                    if (visitor.DonationToken != null)
                    {
                        claims.Add(new Claim("donationToken", visitor.DonationToken));
                    }

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
        public async Task<ActionResult> Register([FromBody] RegisterDTO model)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };

            var resultaat = await _userManager.CreateAsync(user, model.Password);


            await _context.Visitors.AddAsync( new Visitor
            {
                IdentityUser = user, 
                Name = model.Name, 
                LastName = model.Lastname,
                _2FA = model._2FA
            });


            _context.SaveChanges();

            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);
        }


        [HttpPut]
        [Route("/updateAccount")]
        public async Task<ActionResult<Visitor>> UpdateUser(VisitorDTO visitor)
        {
            Visitor v = await _context.Visitors.FindAsync(visitor.Id);

            if (v != null)
            {
                v.Name = visitor.Firstname;
                v.LastName = visitor.Lastname;
                Console.WriteLine("Naam gewijzigd");

                if (visitor.Email != null)
                {
                    v.IdentityUser.Email = visitor.Email;
                    v.IdentityUser.UserName = visitor.Email;
                    Console.WriteLine("Email gewijzigd");
                }
            }
            else
            {
                return NotFound();
            }

            _context.SaveChanges();
            Console.WriteLine("Doorgevoerd naar Db");
            return v;
        }

        [HttpPost]
        [Route("/passwordchange")]
        public async Task<IActionResult> changePassword(string email, string currentPassword,string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // gebruiker niet gevonden
                return NotFound();
            }
            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            if (result.Succeeded)
            {
                // wachtwoord gewijzigd
                return Ok();
            }
            else
            {
                // wachtwoord wijzigen mislukt
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("has2FA/{email}")]
        public async Task<ActionResult<bool>> Has2FA(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return NotFound();

            var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == user.Id).FirstOrDefaultAsync();
            if (visitor == null) return NotFound();

            return visitor._2FA;
        }
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
        public string Name {get;set;}
        public string Lastname {get;set;}
        public bool _2FA { get; set; }

    }

    public class VisitorDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }

    }

}
