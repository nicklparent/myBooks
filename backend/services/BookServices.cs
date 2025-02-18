using backend.Data;
using backend.Models;

public class BookService {
    private AppDbContext _db;
    public List<Book> books = [];

    public BookService(AppDbContext context) {
        _db = context;
    }

    
}