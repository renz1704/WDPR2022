
public class Ticket
{
    public int Id { get; set; }
    public bool isAvailable { get; set; }
    public double Price { get; set; }
    public virtual int SeatId { get; set; }
    public virtual int PerformanceId { get; set; }
    // public virtual Reservation Reservation { get; set; }
}