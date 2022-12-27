
public class Genre
{
    public Genre()
    {
        Shows = new List<Show>();
    }

    public int Id { get; set; }
    public string GenreName { get; set; }
    public virtual List<Show> Shows { get; private set; }

}
