using backend.Data;
using backend.Models;
using MySql.Data.MySqlClient;

public class BookService {
    private AppDbContext _dbconnection;

    public BookService(AppDbContext _dbconnection) {
        this._dbconnection = _dbconnection;
    }

    public static Book ReaderToBook(MySqlDataReader reader) {
        return new Book
        {
            Id = !reader.IsDBNull(reader.GetOrdinal("Id")) ? reader.GetInt32("Id") : 0,
            Title = !reader.IsDBNull(reader.GetOrdinal("Title")) ? reader.GetString("Title") : "Untitled",
            Author = !reader.IsDBNull(reader.GetOrdinal("Author")) ? reader.GetString("Author") : "Unknown Author",
            Genre = !reader.IsDBNull(reader.GetOrdinal("Genre")) ? reader.GetString("Genre") : "Unknown Genre",
            PageCount = !reader.IsDBNull(reader.GetOrdinal("PageCount")) ? reader.GetInt32("PageCount") : 0,
            Description = !reader.IsDBNull(reader.GetOrdinal("Description")) ? reader.GetString("Description") : "No Description available",
            CoverImageUrl = !reader.IsDBNull(reader.GetOrdinal("CoverImageUrl")) ? reader.GetString("CoverImageUrl") : "No Image Available",
        };
    }

}