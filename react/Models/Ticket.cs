public class Ticket
{
    public Ticket()
    {
        isTransfered = false;
    }
    public int Id { get; set; }
    public bool isAvailable { get; set; }
    public double Price { get; set; }
    public  Seat Seat { get; set; }
    public  Performance Performance { get; set; }
    public  Reservation Reservation { get; set; }
    public Boolean isTransfered {get;set;}
}

public class TransferedTicket {

    public TransferedTicket(){
        
    }
    public TransferedTicket(Ticket t, Visitor _visitor){

        this.TicketId = t.Id;
        this.Price = t.Price;
        this.Seat = t.Seat;
        this.Performance = t.Performance;
        this.Visitor = _visitor;
    }
    public int Id {get; set;}
    public int TicketId {get; set;}
    public double Price {get; set;}
    public Seat Seat {get; set;}
    public Performance Performance {get; set;}
    public Visitor Visitor {get; set;}
}
