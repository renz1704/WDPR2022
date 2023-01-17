
public class Donation {

    public Donation(int visitorId, double amount){
        this.VisitorId = visitorId;
        this.amount = amount;
    }

    public int Id{get; set;}
    public int VisitorId {get; set;}
    public double amount{get; set;}

}