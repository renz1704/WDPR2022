namespace react.Models
{
    public class Donation : Payment
    {
        public string DonationMessage { get; set; }
        public virtual Visitor Visitor { get; set; }
    }
}
