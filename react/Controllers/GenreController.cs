using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly ITheaterDbContext _context;

        public GenreController(ITheaterDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("genres")]
        public async Task<ActionResult<List<Genre>>> GetAll(){
            return _context.Genres.ToList();
        }

        
        [HttpGet]
        [Route("getGenre")]
        public async Task<ActionResult<Genre>> Get(int id)
        {
            return await _context.Genres.FindAsync(id);
        }

        [HttpPost]
        [Route("createGenre")]
        public async Task<ActionResult<Genre>> Create (Genre genre)
        {
            if (_context == null)
            {
                throw new ArgumentNullException(nameof(_context));
            }
            await _context.Genres.AddAsync(genre); //line 41 <-----
            _context.SaveChanges();
            return genre;
        }

        
        [HttpGet]
        [Route("GetGenresString")]
        public async Task<ActionResult<List<string>>> GetGenreStringsAsync()
        {
            List<string> Genres = new List<string>();
            foreach (Genre g in _context.Genres)
            {
                Genres.Add(g.GenreName);
            }

            return Genres;
        }
    }
}
