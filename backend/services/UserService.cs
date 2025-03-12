using backend.Data;
using backend.Models;
using MySql.Data.MySqlClient;

namespace backend.services {
    public class UserService {

        private readonly AppDbContext _dbconnection;

        public UserService(AppDbContext _dbconnection) {
            this._dbconnection = _dbconnection;
        }
        public User GetUserByEmailAndPassword(string email, string password) {
            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM users WHERE email = @email AND password = @password";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@email", email);
                    cmd.Parameters.AddWithValue("@password", password);
                    using (var reader = cmd.ExecuteReader()) {
                        if (reader.Read()) {
                            return ReaderToUser(reader);
                        }
                    }
                }
            }

            return null;
        }

        public static User ReaderToUser(MySqlDataReader reader) {
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
