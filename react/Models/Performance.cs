public class Performance
{
    private readonly ITheaterDbContext _context;

    public Performance(int showId, int roomId)
    {
        RoomId = roomId;
        ShowId = showId;
    }

    public int Id { get; set; }
    public int ShowId { get; private set; }
    public int RoomId { get; private set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public virtual Show Show 
    {
        get
        {
            return _context.Shows.Find(ShowId);
        }
    }

    public virtual Room Room 
    {
        get
        {
            return _context.Rooms.Find(RoomId);
        }
    }
}