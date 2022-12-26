
    public class Performance
    {
        public int Id { get; set; }
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public virtual Show Show { get; set; }
        public virtual Room Room { get; set; }

    }

