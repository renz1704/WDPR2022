using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class Room
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Row> Rows { get; set; }
}