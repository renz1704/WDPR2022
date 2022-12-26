
    public class Reservation
    {
        public int Id { get; set; }
        public virtual Visitor Visitor { get; set; }
        public virtual Payment Payment { get; set; }
    }

