using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly AppDbContext _dbconnection;
        private readonly string key;

        public AuthController(AppDbContext _dbconnection, IConfiguration configuration) {
            this._dbconnection = _dbconnection;
            key = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("Could not find Jwt Key");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User request) {
            //Check for in valid reqeust
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password)) {
                return BadRequest("Invalid Credentials sent");
            }

            string email = request.Email;
            string password = request.Password;
            
            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM users WHERE email = @email AND password + @password";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@email", email);
                    cmd.Parameters.AddWithValue("@password", password);
                }
            }


            return StatusCode(500, "Something went wrong");
        }
    }
}
