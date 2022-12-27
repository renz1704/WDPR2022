using Microsoft.AspNetCore.Identity;


public class Employee
{
    public int Id { get; set; }
    public string Position { get; set; }
    public virtual IdentityUser IdentityUser { get; set; }
}
