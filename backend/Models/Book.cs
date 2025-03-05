using System.ComponentModel.DataAnnotations;

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
    }
}