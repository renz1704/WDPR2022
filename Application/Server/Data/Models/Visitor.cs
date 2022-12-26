using Microsoft.AspNetCore.Identity;


    public class Visitor : IdentityUser
    {

        public string Name { get; set; }

        public string LastName { get; set; }
    }
