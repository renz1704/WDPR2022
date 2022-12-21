using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
public class Seat
{
    public int Id { get; set; }
    public string Number { get; set; }
    public string Type { get; set; }
}