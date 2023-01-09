
public class Performance
{

    public Performance(int showId, int roomId, TheaterDbContext context)
    {   
        Room = context.Rooms.Find(roomId);
        Show = context.Shows.Find(showId);
    }

    public int Id { get; private set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public virtual Show Show { get; private set; }
    public virtual Room Room { get; private set; }

}
