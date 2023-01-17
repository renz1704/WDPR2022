using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Tests_API;
using Xunit;

public class RowControllerTests
{
    [Fact]
    public void Get_ReturnsNotFound_WhenRowDoesNotExist()
    {
        // Arrange
        var mockRows = new List<Row>().AsQueryable();
        var mockContext = new Mock<ITheaterDbContext>();
        mockContext.Setup(c => c.Rows).Returns(mockRows.Where(r => r.Id == 1).AsDbSet());
        var controller = new RowController(mockContext.Object);

        // Act
        var result = controller.Get(1);

        // Assert
        Xunit.Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Get_ReturnsOk_WhenRowExists()
    {
        // Arrange
        var row = new Row { Id = 1 };
        var mockContext = new Mock<ITheaterDbContext>();
        mockContext.Setup(c => c.Rows.SingleOrDefault(It.IsAny<Func<Row, bool>>()))
            .Returns(row);
        var controller = new RowController(mockContext.Object);

        // Act
        var result = controller.Get(1);

        // Assert
        Xunit.Assert.IsType<OkObjectResult>(result);
        var objectResult = (OkObjectResult)result;
        Xunit.Assert.Equal(row, objectResult.Value);
    }

    [Fact]
    public void Post_ReturnsBadRequest_WhenModelStateIsInvalid()
    {
        // Arrange
        var mockContext = new Mock<ITheaterDbContext>();
        var controller = new RowController(mockContext.Object);
        controller.ModelState.AddModelError("key", "error message");

        // Act
        var result = controller.Post(new Row());

        // Assert
        Xunit.Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Post_ReturnsCreatedAtActionResult_WhenModelStateIsValid()
    {
        // Arrange
        var row = new Row { Id = 1 };
        var mockContext = new Mock<ITheaterDbContext>();
        mockContext.Setup(c => c.Rows.Add(It.IsAny<Row>()))
            .Callback((Row r) => { r.Id = row.Id; });
        var controller = new RowController(mockContext.Object);

        // Act
        var result = controller.Post(row);

        // Assert
        Xunit.Assert.IsType<CreatedAtActionResult>(result);
        var createdAtActionResult = (CreatedAtActionResult)result;
        Xunit.Assert.Equal("Get", createdAtActionResult.ActionName);
        Xunit.Assert.Equal(row, createdAtActionResult.Value);
    }
}
