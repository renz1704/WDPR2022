using Microsoft.AspNetCore.Identity;

public class Actor : IdentityUser
{
    public Actor()
    {
        Groups = new List<Group>();
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string StageName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public virtual List<Group> Groups { get; set; }
}
