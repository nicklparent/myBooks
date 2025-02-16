using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase{
        private readonly BookService _bookService;
        public BookController(BookService _bookService) {
            this._bookService = _bookService;
        }

        //GET: api/books
        [HttpGet]
        public IActionResult GetAllBooks() {
            var books = _bookService.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id) {
            var book = _bookService.GetBookById(id);
            if (book == null) {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book) {
            _bookService.AddBook(book);
            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book) {
            if (id != book.Id) {
                return BadRequest();
            }
            _bookService.UpdateBook(book);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id) {
            _bookService.DeleteBook(id);
            return NoContent();
        }
    }
}