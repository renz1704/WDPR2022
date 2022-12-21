using Microsoft.AspNetCore.Identity;

namespace react.Models;

public class ApplicationUser : IdentityUser
{
    public int Id {get; set;}

    public String Name {get; set;}

    public String LastName {get; set;}

    public String UserName {get; set;}

    public String Email {get; set;}

    public String Password {get; set;}

}
