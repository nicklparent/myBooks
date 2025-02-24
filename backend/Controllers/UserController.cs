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

        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] User user) {
            string email = user.Email;
            string password = user.Password; // Hash this password in production

            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM users WHERE Email = @Email AND Password = @Password";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password); // Use hashed password in production
                    try {
                        var result = cmd.ExecuteReader();
                        if (result.Read()) {
                            return Ok(new { Id = result.GetInt32("Id") });
                        }
                        else {
                            return NotFound(new { message = "User not found" });
                        }
                    }
                    catch (MySqlException e) {
                        return StatusCode(500, new { message = "Error fetching user: " + e.Message });
                    }
                    finally {
                        _dbconnection.Connection.Close(); // Ensure the connection is closed
                    }
                }
            }

            return StatusCode(500, new { message = "Error connecting to database" });
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
    }
}
