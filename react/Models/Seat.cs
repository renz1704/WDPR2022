
public class Seat
{
    public int Id { get; set; }
    public string SeatNumber { get; set; }
    public Row Row {get;set;}
    public bool IsDisabled { get; set; }
}