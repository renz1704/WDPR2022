public class Artist{
    public int id{get;set;}
    public string FirstName{get;set;}
    public string LastName{get;set;}
    public List<Group> Groups {get;set;} = new List<Group>();
}