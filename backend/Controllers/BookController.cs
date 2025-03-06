﻿using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using backend.Models;
using backend.Data;
namespace backend.Controllers {
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
                            Id = !reader.IsDBNull(reader.GetOrdinal("Id")) ? reader.GetInt32("Id") : 0,
                            Title = !reader.IsDBNull(reader.GetOrdinal("Title")) ? reader.GetString("Title") : "Untitled",
                            Author = !reader.IsDBNull(reader.GetOrdinal("Author")) ? reader.GetString("Author") : "Unknown Author",
                            Genre = !reader.IsDBNull(reader.GetOrdinal("Genre")) ? reader.GetString("Genre") : "Unknown Genre",
                            PageCount = !reader.IsDBNull(reader.GetOrdinal("PageCount")) ? reader.GetInt32("PageCount") : 0,
                            Description = !reader.IsDBNull(reader.GetOrdinal("Description")) ? reader.GetString("Description") : "No Description available",
                            CoverImageUrl = !reader.IsDBNull(reader.GetOrdinal("CoverImageUrl")) ? reader.GetString("CoverImageUrl") : "No Image Available",
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
                    using (var reader = cmd.ExecuteReader()) {
                        if (reader.Read()) {
                            Book book = Book.ReaderToBook(reader);
                            return Ok(book);
                        }
                    }
                }
            }
            return StatusCode(500, new { message = "Could not find book" });
        }

        ///<summary>
        ///Get the users most recently read book
        ///</summary>
        ///<param name="userId">Id for the user</param>
        ///<returns>The most recently read book from currently reading collection</returns>
        ///
        [HttpGet("most-recent/{userId}")]
        public IEnumerable<Book> GetMostRecentlyRead(int userId) {
            List<Book> books = [];
            if (_dbconnection.IsConnect()) {
                string query = "" +
                    "SELECT * FROM books " +
                    "INNER JOIN currently_reading ON books.Id = currently_reading.bookId " +
                    "WHERE currently_reading.UserId = @id " +
                    "ORDER BY currently_reading.LastRead";

                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@id", userId);
                    using (var reader = cmd.ExecuteReader()) {
                        while (reader.Read()) {
                            books.Add(Book.ReaderToBook(reader));
                        }
                    }
                }
            }
            return books;
        }
    }
}
