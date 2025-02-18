using Microsoft.AspNetCore.Mvc;
using backend.Models;
namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : Controller
    {
        [HttpGet]
        public IEnumerable<Book> GetAllBooks() {
            return Enumerable.Range(1, 1000).Select(index => new Book
            {
                Id = index,
                Title = $"Book {index}",
                Author = $"Author {index}",
                Genre = $"Genre {index}"
            });
        }
    }
}
