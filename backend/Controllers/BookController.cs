using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using backend.Models;
using backend.Data;
namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : Controller {
        private readonly AppDbContext _dbconnection;

        public BookController(AppDbContext _dbconnection) {
            this._dbconnection = _dbconnection;
        }

        [HttpGet]
        public IEnumerable<Book> GetAllBooks() {
            var books = new List<Book>();

            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM books";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection))
                using (var reader = cmd.ExecuteReader()) {
                    while (reader.Read()) {
                        books.Add(new Book
                        {
                            Id = reader.GetInt32("Id"),
                            Title = reader.GetString("Title"),
                            Author = reader.GetString("Author"),
                            Genre = reader.GetString("Genre")
                        });
                    }
                }
                _dbconnection.CloseConnection();
            }

            return books;
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id) {
            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM books WHERE Id = @id";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    if (reader.Read()) {
                        Book book = new Book
                        {
                            Id = reader.GetInt32("Id"),
                            Title = reader.GetString("Title"),
                            Author = reader.GetString("Author"),
                            Genre = reader.GetString("Genre"),
                        };
                    }
                }
            }
            return StatusCode(500, new { message = "Could not find book"});
        }

    }
}
