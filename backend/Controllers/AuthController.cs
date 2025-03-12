using backend.Data;
using backend.Models;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.IdentityModel.Tokens.Jwt;
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
            UserService userService = new UserService(_dbconnection);
            User user = userService.GetUserByEmailAndPassword(email, password);

            if (user != null) {
                var tokenHandler = new JwtSecurityTokenHandler();
            }

            return StatusCode(500, "Something went wrong");
        }
    }
}
