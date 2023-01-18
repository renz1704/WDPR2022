using System.Linq.Expressions;
using Xunit;
using Moq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

public class ShowControllerTests
{
    [Fact]
    public async Task Create_AddsShowToDbContext_AndReturnsShow()
    {
        // Arrange
        var show = new Show();
        var dbContextMock = new Mock<ITheaterDbContext>();
        dbContextMock.Setup(x => x.Shows.AddAsync(It.IsAny<Show>())).Returns(Task.CompletedTask);
        var controller = new ShowController(dbContextMock.Object);

        // Act
        var result = await controller.Create(show);

        // Assert
        dbContextMock.Verify(x => x.Shows.AddAsync(show), Times.Once);
        dbContextMock.Verify(x => x.SaveChanges(), Times.Once);
        Xunit.Assert.Equal(show, result);
    }

    [Fact]
    public async Task AddGroupById_AddsGroupToShow_AndReturnsShow()
    {
        // Arrange
        var groupId = 1;
        var showId = 2;
        var group = new Group { Id = groupId };
        var show = new Show { Id = showId };
        var dbContextMock = new Mock<ITheaterDbContext>();
        dbContextMock.Setup(x => x.Groups.FindAsync(groupId)).ReturnsAsync(group);
        dbContextMock.Setup(x => x.Shows.FindAsync(showId)).ReturnsAsync(show);
        var controller = new ShowController(dbContextMock.Object);

        // Act
        var result = await controller.AddGroupById(groupId, showId);

        // Assert
        Xunit.Assert.Contains(group, show.Groups);
        dbContextMock.Verify(x => x.SaveChanges(), Times.Once);
        Xunit.Assert.Equal(show, result);
    }

    [Fact]
    public async Task AddGenre_AddsGenreToShow_AndReturnsShow()
    {
        // Arrange
        var genreId = 1;
        var showId = 2;
        var genre = new Genre { Id = genreId };
        var show = new Show { Id = showId };
        var dbContextMock = new Mock<ITheaterDbContext>();
        dbContextMock.Setup(x => x.Genres.FindAsync(genreId)).ReturnsAsync(genre);
        dbContextMock.Setup(x => x.Shows.FindAsync(showId)).ReturnsAsync(show);
        var controller = new ShowController(dbContextMock.Object);

        // Act
        var result = await controller.AddGenre(genreId, showId);

        // Assert
        Xunit.Assert.Contains(genre, show.Genres);
        dbContextMock.Verify(x => x.SaveChanges(), Times.Once);
        Xunit.Assert.Equal(show, result);
    }

    // [Fact]
    // public async Task getShows_ReturnsShowWithGroupsAndGenres()
    // {
    //     // Arrange
    //     var showId = 1;
    //     var show = new Show { Id = showId };
    //     var groups = new List<Group> { new Group(), new Group() };
    //     var genres = new List<Genre> { new Genre(), new Genre() };
    //     show.Groups = groups;
    //     show.Genres = genres;
    //     var dbContextMock = new Mock<ITheaterDbContext>();
    //     dbContextMock.Setup(x => x.Shows
    //             .Include(s => s.Groups)
    //             .ThenInclude(g => g.Groups)
    //             .Include(s => s.Genres)
    //             .ThenInclude(g => g.Genres)
    //             .FirstOrDefaultAsync(s => s.Id == showId))
    //         .ReturnsAsync(show);
    //
    //
    //
    //     var controller = new ShowController(dbContextMock.Object);
    //
    //     // Act
    //     var result = await controller.getShows(showId);
    //
    //     // Assert
    //     Xunit.Assert.Equal(show, result);
    //     Xunit.Assert.Equal(groups, result.Groups);
    //     Xunit.Assert.Equal(genres, result.Genres);
    // }
}
