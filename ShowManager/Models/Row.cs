using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
public class Row
{
    public int Id { get; set; }
    public List<Seat> Seats { get; set; }
}