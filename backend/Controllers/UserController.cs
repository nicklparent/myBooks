using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller {
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
                        users.Add(new User
                        {
                            Id = reader.GetInt32("Id"),
                            Email = reader.GetString("Email"),
                            FirstName = reader.GetString("FirstName"),
                            LastName = reader.GetString("LastName"),
                            Password = reader.GetString("Password"),
                        });
                    }
                }
            }
            return users;
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

        [HttpGet("/get-user-preference/{userId}")]
        public IActionResult GetUserPreferences(int userId) {
            if (_dbconnection.IsConnect()) {
                string query = "SELECT Theme FROM preferences WHERE UserId = @UserId";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@UserId", userId);
                    using (var reader = cmd.ExecuteReader()) {
                        if (reader.Read()) {
                            return Ok(new UserPreferences
                            {
                                ColorTheme = !reader.IsDBNull(reader.GetOrdinal("ColorTheme")) ? reader.GetString("ColorTheme") : "dark"
                            });
                        }
                        
                    }
                }
            }

            return StatusCode(500, new { message = "could not connect to database"});
        }
    }
}
