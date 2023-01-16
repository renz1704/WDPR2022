using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Tests_API;

using Microsoft.AspNetCore.Mvc;
using Xunit;
using Moq;

public class GroupControllerTests
{
    [Fact]
    public async Task CreateGroup_ReturnsGroup()
    {
        // Arrange
        var group = new Group { Id = 1, Name = "Test Group" };

        var mockDbContext = new Mock<ITheaterDbContext>();
        mockDbContext.Setup(x => x.Groups.Add(It.IsAny<Group>())).Callback<Group>((group) => {});
        var controller = new GroupController(mockDbContext.Object);

        // Act
        var result = await controller.createGroup(group);

        // Assert
        var returnGroup = Assert.IsType<Group>(result.Value);
        Assert.Equal(group, returnGroup);

    }
}
