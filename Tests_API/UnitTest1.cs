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
        //De test (Get_ShouldReturnListOfRoomIds) controleert of de Get methode van de RoomController
        //een lijst van kamernummers (roomIds) retourneert.
        
        // Arrange
        //Eerst wordt er in de "Arrange" sectie een mock object aangemaakt van ITheaterDbContext en een lijst van
        //kamernummers gedefinieerd. Hierna wordt de mock DbSet aangemaakt met behulp van de roomIds lijst en deze
        //wordt gekoppeld aan de mockDbContext.
        var mockDbContext = new Mock<ITheaterDbContext>();
        var roomIds = new List<int> { 1, 2, 3 };
        var roomList = roomIds.Select(id => new Room { Id = id }).AsQueryable().AsDbSet();
        mockDbContext.Setup(x => x.Rooms).Returns(roomList);

        var controller = new RoomController(mockDbContext.Object);

        // Act
        //In de "Act" sectie wordt de Get methode van de RoomController aangeroepen en het resultaat opgeslagen in een variabele.
        var result = (OkObjectResult)controller.Get();
        var returnValue = (List<int>)result.Value;

        // Assert
        //Tot slot in de "Assert" sectie wordt er gecontroleerd of de retourwaarde van de Get methode gelijk is aan de
        //gedefinieerde lijst van kamernummers.
        Xunit.Assert.Equal(roomIds, returnValue);
    }

}