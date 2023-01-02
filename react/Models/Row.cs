
public class Row
{
    public Row()
    {
        Seats = new List<Seat>();
    }
    public int Id { get; set; }
    public virtual List<Seat> Seats { get; private set; }
    public virtual Rank Rank { get; set; }
}