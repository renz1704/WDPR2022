using Microsoft.AspNetCore.Identity;


public class Visitor
{

    // public Visitor(IdentityUser identityUserNew){
    //     IdentityUser = identityUserNew;
    // }
    public int Id { get; set; }
    public string Name { get; set; }
    public string LastName { get; set; }
    public string donationToken {get; set;}
    public List<Donation> donations {get; set;}
    public virtual IdentityUser IdentityUser { get; set; }
}