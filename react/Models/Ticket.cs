public class Ticket
{
    public Ticket()
    {
        isTransfered = false;
    }
    public int Id { get; set; }
    public bool isAvailable { get; set; }
    public double Price { get; set; }
    public  Seat Seat { get; set; }
    public  Performance Performance { get; set; }
    public  Reservation Reservation { get; set; }
    public Boolean isTransfered {get;set;}
}
