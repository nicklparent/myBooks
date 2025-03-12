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

        public User ReaderToUser(MySqlDataReader reader) {
            return new User
            {
                Id = !reader.IsDBNull(reader.GetOrdinal("Id")) ? reader.GetInt32("Id") : 0,
                FirstName = !reader.IsDBNull(reader.GetOrdinal("FirstName")) ? reader.GetString("FirstName") : "",
                LastName = !reader.IsDBNull(reader.GetOrdinal("LastName")) ? reader.GetString("LastName") : "",
                Email = !reader.IsDBNull(reader.GetOrdinal("Email")) ? reader.GetString("Email") : "",
                Password = !reader.IsDBNull(reader.GetOrdinal("Password")) ? reader.GetString("Password") : "",
                UserName = !reader.IsDBNull(reader.GetOrdinal("UserName")) ? reader.GetString("UserName") : ""
            };
        }
    }
}
