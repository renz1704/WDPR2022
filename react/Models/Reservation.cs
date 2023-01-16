
public class Reservation
{
    public int Id { get; set; }
    public Visitor Visitor { get; set; }
    public Payment Payment { get; set; }
    public List<Ticket> Tickets {get;set;}
}
