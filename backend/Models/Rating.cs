using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models {
    public class Rating {
        [Key]
        public int Id { get; set; }
        [NotNull]
        public double RatingScore { get; set; }
        [NotNull]
        public int UserId { get; set; }
        [NotNull]
        public int BookId { get; set; }
        [AllowNull]
        public string Review { get; set; }
    }
}
