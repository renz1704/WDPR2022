
public class Row
{
    public Row()
    {
        Seats = new List<Seat>();
    }
    public int Id { get; set; }
    public List<Seat> Seats { get; private set; }

    public int Rank { get; set; }
}