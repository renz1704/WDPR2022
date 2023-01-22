using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class SeatControllerTests
{
    private readonly SeatController _controller;
    private readonly Mock<ITheaterDbContext> _contextMock;

    public SeatControllerTests()
    {
        _contextMock = new Mock<ITheaterDbContext>();
        _controller = new SeatController(_contextMock.Object);
    }

    [Fact]
    public void Get_ShouldReturnNotFound_WhenSeatNotFound()
    {
        // Arrange
        var mockSet = new Mock<DbSet<Seat>>();
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Provider).Returns(new List<Seat>().AsQueryable().Provider);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Expression).Returns(new List<Seat>().AsQueryable().Expression);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.ElementType).Returns(new List<Seat>().AsQueryable().ElementType);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.GetEnumerator()).Returns(new List<Seat>().AsQueryable().GetEnumerator());
        _contextMock.Setup(x => x.Seats).Returns(mockSet.Object);

        // Act
        var result = _controller.Get(1);

        // Assert
        Xunit.Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Get_ShouldReturnOk_WhenSeatFound()
    {
        // Arrange
        var seat = new Seat { Id = 1 };
        var mockSet = new Mock<DbSet<Seat>>();
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Provider).Returns(new List<Seat> { seat }.AsQueryable().Provider);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Expression).Returns(new List<Seat> { seat }.AsQueryable().Expression);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.ElementType).Returns(new List<Seat> { seat }.AsQueryable().ElementType);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.GetEnumerator()).Returns(new List<Seat> { seat }.AsQueryable().GetEnumerator());
        _contextMock.Setup(x => x.Seats).Returns(mockSet.Object);

        // Act
        var result = _controller.Get(1);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        Xunit.Assert.Same(seat, okResult.Value);
    }

    [Fact]
    public void Post_ShouldReturnBadRequest_WhenModelStateIsInvalid()
    {
        // Arrange
        _controller.ModelState.AddModelError("error", "some error");

        // Act
        var result = _controller.Post(new Seat());

        // Assert
        var badRequestResult = Xunit.Assert.IsType<BadRequestObjectResult>(result);
        Xunit.Assert.IsType<SerializableError>(badRequestResult.Value);
    }

    [Fact]
    public void Post_ShouldReturnCreatedAtActionResult_WhenModelStateIsValid()
    {
        // Arrange
        var seat = new Seat { Id = 1 };
        var mockSet = new Mock<DbSet<Seat>>();
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Provider).Returns(new List<Seat> { seat }.AsQueryable().Provider);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.Expression).Returns(new List<Seat> { seat }.AsQueryable().Expression);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.ElementType).Returns(new List<Seat> { seat }.AsQueryable().ElementType);
        mockSet.As<IQueryable<Seat>>().Setup(m => m.GetEnumerator()).Returns(new List<Seat> { seat }.AsQueryable().GetEnumerator());
        _contextMock.Setup(x => x.Seats).Returns(mockSet.Object);

        // Act
        var result = _controller.Post(seat);

        // Assert
        var createdAtActionResult = Xunit.Assert.IsType<CreatedAtActionResult>(result);
        Xunit.Assert.Equal("Get", createdAtActionResult.ActionName);
        Xunit.Assert.Same(seat, createdAtActionResult.Value);
    }
}
