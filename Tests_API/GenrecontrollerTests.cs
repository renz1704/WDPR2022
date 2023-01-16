using Xunit;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using react.Controllers;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Tests_API
{

    
    public class GenreControllerTests
    {
        private GenreController _controller;
        private Mock<ITheaterDbContext> _context;

        
        public void Initialize()
        {
            _context = new Mock<ITheaterDbContext>();
            _controller = new GenreController(_context.Object);
        }

        [Fact]
        public async Task GetAll_ShouldReturnAllGenres()
        {
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
            // Arrange
            var genres = new List<Genre>
            {
                new Genre { Id = 1, GenreName = "Comedy" },
                new Genre { Id = 2, GenreName = "Drama" }
            };
            //mock zodat de lijst wordt gereturned
            _context.Setup(x => x.Genres.FindAsync(It.IsAny<int>())).ReturnsAsync((int id) => genres.FirstOrDefault(x => x.Id == id));

            // Act
            OkObjectResult result = await _controller.Get(2);


            // Assert
            //controleer of het resultaat ok is
            var okResult = result;
            Xunit.Assert.NotNull(okResult);
            
            //check of de waarde van het resultaat een genre is
            var returnedGenre = okResult.Value as Genre;
            
            //check of drama gereturned is
            Xunit.Assert.Equal("Drama", returnedGenre.GenreName);
        }

        [Fact]
        public async Task Create_ShouldAddGenreAndReturnIt()
        {
            // Arrange
            var genre = new Genre { Id = 3, GenreName = "Horror" };
            _context.Setup(x => x.Genres.Add(genre));
            _context.Setup(x => x.SaveChanges()).Returns(1);

            // Act
            var result = await _controller.Create(genre);

            // Assert
            //Verify dat de Add methode gecalled is
            _context.Verify(x => x.Genres.Add(genre), Times.Once);
            
            //Verify dat de SaveChanges methode gecalled is
            _context.Verify(x => x.SaveChanges(), Times.Once);
            
            //controleer of het resultaat ok is
            var okResult = result as OkObjectResult;
            Xunit.Assert.NotNull(okResult);
            
            //controlleer of de genre gereturned wordt
            var returnedGenre = okResult.Value as Genre;
            Xunit.Assert.Equal(genre, returnedGenre);
        }

        [Fact]
        public async Task GetGenreStringsAsync_ShouldReturnListOfGenreNames()
        {
            // Arrange
            var genres = new List<Genre>
            {
                new Genre { Id = 1, GenreName = "Comedy" },
                new Genre { Id = 2, GenreName = "Drama" }
            };
            var genreDbSetMock = new Mock<DbSet<Genre>>();
            genreDbSetMock.As<IQueryable<Genre>>().Setup(m => m.Provider).Returns(genres.AsQueryable().Provider);
            genreDbSetMock.As<IQueryable<Genre>>().Setup(m => m.Expression).Returns(genres.AsQueryable().Expression);
            genreDbSetMock.As<IQueryable<Genre>>().Setup(m => m.ElementType).Returns(genres.AsQueryable().ElementType);
            genreDbSetMock.As<IQueryable<Genre>>().Setup(m => m.GetEnumerator()).Returns(genres.AsQueryable().GetEnumerator());
            _context.Setup(x => x.Genres).Returns(genreDbSetMock.Object);

            // Act
            var result = await _controller.GetGenreStringsAsync();

            // Assert
            //controleer of het resultaat ok is
            var okResult = result;
            Xunit.Assert.NotNull(okResult);
            
            //controlleer of de waarde een lijst met strings is
            var returnedGenres = okResult.Value as List<string>;
            
            //controleer of de lijst grootte 2 is
            Xunit.Assert.Equal(2, returnedGenres.Count);
            
            //controleer of de 1e waarde comedy is
            Xunit.Assert.Equal("Comedy", returnedGenres[0]);
            
            //controleer of de 2e waarde drama is
            Xunit.Assert.Equal("Drama", returnedGenres[1]);
        }
    }
}
