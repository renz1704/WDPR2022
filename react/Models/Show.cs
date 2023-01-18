
public class Show
{
    public Show()
    {
        Genres = new List<Genre>();
        Groups = new List<Group>();
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public string WebsiteUrl { get; set; }
    public string Price { get; set; }
    public virtual List<Genre> Genres { get; set; }
    public virtual List<Group> Groups { get; set; }

}
