using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

public class RowControllerTests
{
    private readonly Mock<ITheaterDbContext> _mockContext;
    private readonly RowController _controller;

    public RowControllerTests()
    {
        _mockContext = new Mock<ITheaterDbContext>();
        _controller = new RowController(_mockContext.Object);
    }

    [Fact]
    public void Get_ReturnsNotFound_WhenRowNotExists()
    {
        // Arrange
        var rows = new[]
        {
            new Row { Id = 1 },
            new Row { Id = 2 },
            new Row { Id = 3 },
        }.AsQueryable();
        var mockDbSet = new Mock<DbSet<Row>>();
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Provider).Returns(rows.Provider);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Expression).Returns(rows.Expression);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.ElementType).Returns(rows.ElementType);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.GetEnumerator()).Returns(rows.GetEnumerator());
        _mockContext.Setup(x => x.Rows).Returns(mockDbSet.Object);

        // Act
        var result = _controller.Get(4);

        // Assert
        Xunit.Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Get_ReturnsOk_WhenRowExists()
    {
        // Arrange
        var rows = new[]
        {
            new Row { Id = 1 },
            new Row { Id = 2 },
            new Row { Id = 3 },
        }.AsQueryable();
        var mockDbSet = new Mock<DbSet<Row>>();
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Provider).Returns(rows.Provider);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Expression).Returns(rows.Expression);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.ElementType).Returns(rows.ElementType);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.GetEnumerator()).Returns(rows.GetEnumerator());
        _mockContext.Setup(x => x.Rows).Returns(mockDbSet.Object);

        // Act
        var result = _controller.Get(2);

        // Assert
        var okResult = Xunit.Assert.IsType<OkObjectResult>(result);
        var returnedRow = Xunit.Assert.IsType<Row>(okResult.Value);
        Xunit.Assert.Equal(2, returnedRow.Id);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenModelStateIsInvalid()
    {
        // Arrange
        _controller.ModelState.AddModelError("error", "some error");
        var row = new Row();

        // Act
        var result = _controller.Post(row);

        // Assert
        var badRequestResult = Xunit.Assert.IsType<BadRequestObjectResult>(result);
        Xunit.Assert.IsType<SerializableError>(badRequestResult.Value);
    }

    [Fact]
    public void Post_ReturnsCreatedAtAction_WhenRowIsValid()
    {
        // Arrange
        var rows = new[]
        {
            new Row { Id = 1 },
            new Row { Id = 2 },
            new Row { Id = 3 },
        }.AsQueryable();
        var mockDbSet = new Mock<DbSet<Row>>();
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Provider).Returns(rows.Provider);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.Expression).Returns(rows.Expression);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.ElementType).Returns(rows.ElementType);
        mockDbSet.As<IQueryable<Row>>().Setup(x => x.GetEnumerator()).Returns(rows.GetEnumerator());
        _mockContext.Setup(x => x.Rows).Returns(mockDbSet.Object);

        // Act
        var result = _controller.Post(new Row { Id = 4 });

        // Assert
        var createdAtActionResult = Xunit.Assert.IsType<CreatedAtActionResult>(result);
        Xunit.Assert.Equal("Get", createdAtActionResult.ActionName);
        var returnedRow = Xunit.Assert.IsType<Row>(createdAtActionResult.Value);
        Xunit.Assert.Equal(4, returnedRow.Id);
    }
}
