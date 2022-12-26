using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using react.Models;

//De userManager kan gebruikt worden om de rollen toe te kennen.

namespace react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (result.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("registreer")]
        public async Task<ActionResult> Registreer([FromBody] RegisterDTO model)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };

            var resultaat = await _userManager.CreateAsync(user, model.Password);

            return !resultaat.Succeeded ? new BadRequestObjectResult(resultaat) : StatusCode(201);

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
    }
}
