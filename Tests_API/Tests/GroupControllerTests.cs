using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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
        var returnGroup = Xunit.Assert.IsType<Group>(result.Value);
        Xunit.Assert.Equal(group, returnGroup);

    }
}
