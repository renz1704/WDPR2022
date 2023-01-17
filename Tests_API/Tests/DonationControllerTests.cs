using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Microsoft.EntityFrameworkCore;
using Xunit;


public class DonationControllerTests
{
    private DonationController _controller;
    private ITheaterDbContext _context;

    [Fact]
    public void Initialize()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<TheaterDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        _context = new TheaterDbContext(options);
        _controller = new DonationController(_context);
    }
}