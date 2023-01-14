using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Tests_API;

public class RoomControllerTests
{
    [Fact]
    public void Get_ShouldReturnListOfRoomIds()
    {
        // Arrange
        var mockDbContext = new Mock<TheaterDbContext>();
        var roomIds = new List<int> { 1, 2, 3 };
        var roomList = roomIds.Select(id => new Room { Id = id }).AsQueryable().AsDbSet();
        mockDbContext.Setup(x => x.Rooms).Returns(roomList);

        var controller = new RoomController(mockDbContext.Object);

        // Act
        var result = (OkObjectResult)controller.Get();
        var returnValue = (List<int>)result.Value;

        // Assert
        Xunit.Assert.Equal(roomIds, returnValue);
    }

}