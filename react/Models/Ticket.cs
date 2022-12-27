
public class Ticket
{
    public int Id { get; set; }
    public bool isAvailable { get; set; }
    public double Price { get; set; }
    public virtual Seat Seat { get; set; }
    public virtual Performance Performance { get; set; }
    public virtual Reservation Reservation { get; set; }


}