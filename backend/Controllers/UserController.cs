using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using MySql.Data.MySqlClient;
using backend.services;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {
        private readonly AppDbContext _dbconnection;
        public UserController(AppDbContext _dbconnection) {
            this._dbconnection = _dbconnection;
        }

        [HttpGet]
        public IEnumerable<User> GetAllUsers() {
            var users = new List<User>();

            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM users";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection))
                using (var reader = cmd.ExecuteReader()) {
                    while (reader.Read()) {
                        users.Add(UserService.ReaderToUser(reader));
                    }
                }
            }
            return users;
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id) {
            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM users WHERE id = @id";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@id",id);
                    using (var reader = cmd.ExecuteReader()) {
                        if (reader.Read()) {
                            return Ok(UserService.ReaderToUser(reader));
                        }
                    }
                }
            }
            return StatusCode(500, new { message = "Could Not find user"}); 
        }

        [HttpGet("get-by-email-password/{email}/{password}")]
        public IActionResult GetByEmailAndPassword(string email, string password) {
            if (!_dbconnection.IsConnect()) {
                return StatusCode(500, new { message = ""});
            }

            string query = "SELECT * FROM users WHERE Email = @email AND Password = @password";
            using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@password", password);
                using (var reader = cmd.ExecuteReader()) {
                    if (reader.Read()) {
                        return Ok(UserService.ReaderToUser(reader));
                    }
                }
            }
            return StatusCode(400, new { message = "could not find user" });
        }


        [HttpPost]
        public IActionResult CreateNewUser([FromBody] User user) {
            if (user == null) {
                return BadRequest("fields cannot be empty");
            }

            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            if (_dbconnection.IsConnect()) {
                string query = "INSERT INTO users (Email, FirstName, Lastname, Password, UserName) VALUES (@Email, @FirstName, @LastName. @Password, @UserName)";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", user.LastName);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@UserName", user.UserName);
                    try {
                        cmd.ExecuteNonQuery();
                        return Ok(new { message = "Account created Succsesfully" });
                    } catch (MySqlException e) {
                        return StatusCode(500, new {
                            message = "An error occured while trying to create account: " + e.Message
                        });
                    }
                }
            }
            return StatusCode(500, new { message = "Could not connect to data" });
        }

        [HttpGet("get-user-preference/{userId}")]
        public IActionResult GetUserPreferences(int userId) {
            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM preferences WHERE UserId = @UserId";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    using (var reader = cmd.ExecuteReader()) {
                        if (reader.Read()) {
                            return Ok(new UserPreferences
                            {
                                Theme = !reader.IsDBNull(reader.GetOrdinal("Theme")) ? reader.GetString("Theme") : "dark",
                                ContentFilter = !reader.IsDBNull(reader.GetOrdinal("ContentFilter")) ? reader.GetBoolean("ContentFilter") : false,
                            });
                        }
                        
                    }
                }
            }

            return StatusCode(500, new { message = "could not connect to database"});
        }
    }
}
