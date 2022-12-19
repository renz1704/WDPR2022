using System.ComponentModel.DataAnnotations;

public class Group {
    public int Id {get;set;}
    public int Name {get;set;}
    public List<Artist> Artists { get;set;}
}