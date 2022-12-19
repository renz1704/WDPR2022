public class Ticket{
    public int Id{get;set;}
    
    public Boolean isAvailable{get;set;}

    // de datum van de ticket
    public DateTime Date{get;set;}

    public Show Show{get;set;}

    public Seat Seat{get;set;}
}