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
        public async Task<IActionResult> Login([FromBody] LoginDTO model){
                var _user = await _userManager.FindByNameAsync(model.Email);
                
                var visitor = await _context.Visitors.Where(v => v.IdentityUser.Id == _user.Id).FirstOrDefaultAsync();


        if (_user != null && visitor != null)
            if (await _userManager.CheckPasswordAsync(_user, model.Password))
            {
            var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"));
            var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
            
            var claims = new List<Claim>();
            claims.Add(new Claim("id", visitor.Id.ToString()));
            claims.Add(new Claim ("email", _user.Email));

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

            await _context.Visitors.AddAsync( new Visitor{IdentityUser = user});
            await _context.SaveChangesAsync();

            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);

        }

        [HttpGet]
        [Route("getUser/{id}")]
        public async Task<ActionResult<string>> GetUserId(String id)
        {
            // Check if the user exists in the database
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            // Return the user ID
            return user.Id;
        }



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
    }
}
