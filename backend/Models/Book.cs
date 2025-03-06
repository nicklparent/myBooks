using System.ComponentModel.DataAnnotations;
using MySql.Data.MySqlClient;
namespace backend.Models{
    public class Book {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public int PageCount { get; set; }
        public string Description { get; set; }
        public string CoverImageUrl { get; set; }

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
}