using System.Collections.Generic;
using System.Linq;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services {
    public class BookService {
        private readonly AppDbContext _dbcontext;
        public BookService(AppDbContext context) {
            _dbcontext = context;
        }

        public List<Book> GetAllBooks() {
            return _dbcontext.Books.ToList();
        }

        public Book GetBookById(int id) {
            return _dbcontext.Books.FirstOrDefault(book => book.Id == id);
        }

        public void AddBook(Book book) {
            _dbcontext.Books.Add(book);
            _dbcontext.SaveChanges();
        }

        public void UpdateBook(Book book) {
            _dbcontext.Books.Update(book);
            _dbcontext.SaveChanges();
        }

        public void DeleteBook(int id) {
            var book = _dbcontext.Books.FirstOrDefault(book => book.Id == id);
            if (book != null) {
                _dbcontext.Books.Remove(book);
                _dbcontext.SaveChanges();
            }
            
        }
    }
}