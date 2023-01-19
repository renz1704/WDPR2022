using Microsoft.AspNetCore.Identity;


public class Visitor
{
    public Visitor(){
        Donations = new List<Donation>();
    }
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? LastName { get; set; }
    public string? DonationToken {get; set;}
    public IdentityUser IdentityUser { get; set; }
    public List<TransferedTicket> transferedTickets {get; set;}
    public List<Donation> Donations {get; set;}

}