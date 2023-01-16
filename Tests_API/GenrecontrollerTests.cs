using Xunit;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using react.Controllers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

/*
[Fact] = sleutelwoord wordt gebruikt om een methode te markeren als een testmethode
Task = is een type in .Net-framework voor het weergeven van een asynchrone operations
Mock<T> = wordt gebruikt voor het maken van mock-objecten
DbSet = een tabel in een database 
IQueryable = een interface die een verzameling items vertegenwoordigt
GetEnumerator = GetEnumerator is een methode van de IQueryable-interface die een teller retourneert die de items in de query herhaalt
Setup = Setup is een methode van de klasse Mock<T> die het gedrag van een nepobject instelt
 */

namespace Tests_API
{
    public class GenreControllerTests
    {
        [Fact]
        public async Task GetAll_ShouldReturnAllGenres()
        {
            Mock<ITheaterDbContext> _context = new Mock<ITheaterDbContext>();
            GenreController _controller = new GenreController(_context.Object);

            // Arrange
            //lijst met genres
            var genres = new List<Genre>
            {
                new Genre { Id = 1, GenreName = "Comedy" },
                new Genre { Id = 2, GenreName = "Drama" }
            };
            //mock DbSet
            var mockDbSet = new Mock<DbSet<Genre>>();
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.Provider).Returns(genres.AsQueryable().Provider);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.Expression).Returns(genres.AsQueryable().Expression);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.ElementType).Returns(genres.AsQueryable().ElementType);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.GetEnumerator()).Returns(genres.AsQueryable().GetEnumerator());
            //mock returned de lijst met genres
            _context.Setup(x => x.Genres).Returns(mockDbSet.Object);

            // Act
            //get de lijst
            OkObjectResult result = await _controller.GetAll();
            
            // Assert
            //controleer of het resultaat ok is
            var okResult = result as OkObjectResult;
            Xunit.Assert.NotNull(okResult);
           
            //check of de waarde van het resultaat een genre is
            var returnedGenres = okResult.Value as List<Genre>;
            
            //controleer of het aantal 2 is
            Xunit.Assert.Equal(2, returnedGenres.Count);
           
            //check of de namen van de genre kloppen
            Xunit.Assert.Equal("Comedy", returnedGenres[0].GenreName);
            Xunit.Assert.Equal("Drama", returnedGenres[1].GenreName);
        }

        [Fact]
        public async Task Get_ShouldReturnCorrectGenre()
        {
            var mockContext = new Mock<ITheaterDbContext>();
            var genres = new List<Genre>
            {
                new Genre { Id = 1, GenreName = "Comedy" },
                new Genre { Id = 2, GenreName = "Drama" }
            };
            
            mockContext.Setup(x => x.Genres
                    .FindAsync(It.IsAny<object[]>()))
                .Returns( (object[] id) => ValueTask.FromResult(genres.FirstOrDefault(x => x.Id == (int)id[0])) );            
            var controller = new GenreController(mockContext.Object);
            // Act
            var result = await controller.Get(2) as OkObjectResult;

            
            // Assert
            Xunit.Assert.NotNull(result);
            var returnedGenre = result.Value as Genre;
            Xunit.Assert.Equal("Drama", returnedGenre.GenreName);
        }


        [Fact]
        public async Task Create_ShouldReturnOkResult()
        {
            // Arrange
            var genre = new Genre { Id = 3, GenreName = "Horror" };
            var mockContext = new Mock<ITheaterDbContext>();
            var genreList = new List<Genre> { new Genre { Id = 1, GenreName = "Action" }, 
                new Genre { Id = 2, GenreName = "Comedy" } }.AsQueryable();

            var mockDbSet = new Mock<DbSet<Genre>>();
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.Provider).Returns(genreList.Provider);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.Expression).Returns(genreList.Expression);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.ElementType).Returns(genreList.ElementType);
            mockDbSet.As<IQueryable<Genre>>().Setup(m => m.GetEnumerator()).Returns(genreList.GetEnumerator());

            mockContext.Setup(x => x.Genres).Returns(mockDbSet.Object);
            
            var controller = new GenreController(mockContext.Object);

            // Act
            var result = await controller.Create(genre);

            // Assert
            var okResult = result as OkObjectResult;
            Xunit.Assert.NotNull(okResult);
            Xunit.Assert.IsType<OkObjectResult>(okResult);
        }
    }
}
