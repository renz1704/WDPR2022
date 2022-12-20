using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using react.Models;

//De userManager kan gebruikt worden om de rollen toe te kennen.

namespace MyApp.Controllers
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
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var user = new IdentityUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                //Hier kunnen extra dingen na het aanmaken van de gebruiker gebeuren, oa. toevoegen van rollen of een bevestigingsmail.
                return Ok();
            }
            else
            {
                // hier kan je de fouten teruggeven die zijn opgetreden tijdens het aanmaken van de gebruiker.
                return BadRequest(result.Errors);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (result.Succeeded)
            {
                // hier kan je eventueel nog extra stappen uitvoeren na het inloggen van de gebruiker, zoals het genereren van een JWT-token of het ophalen van de gebruikersgegevens.
                return Ok();
            }
            else
            {
                // Hier kan aangegeven worden dat het inloggen mislukt is.
                return Unauthorized();
            }
        }
    }
}
