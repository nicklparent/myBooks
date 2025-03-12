using MySql.Data.MySqlClient;
using System.ComponentModel.DataAnnotations;

namespace backend.Models {
    /// <summary>
    /// Represents Users to be inserted and gathered/pulled from the Database 
    /// </summary>
    public class User {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }

        
    }
}
