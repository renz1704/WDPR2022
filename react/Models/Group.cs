public class Group
{
    public Group()
    {
        Shows = new List<Show>();
        Actors = new List<Actor>();
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public string WebsiteUrl { get; set; }
    public virtual List<Show> Shows { get; set; }
    public virtual List<Actor> Actors { get; set; }


}