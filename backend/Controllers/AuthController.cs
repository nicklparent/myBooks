using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using MySql.Data.MySqlClient;
using backend.services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using backend.Data;

namespace backend.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase {
        private readonly AppDbContext _dbconnection;
        private readonly IConfiguration _configuration;
        private readonly string _key;

        public AuthController(AppDbContext dbconnection, IConfiguration configuration) {
            this._dbconnection = dbconnection;
            this._configuration = configuration;
            this._key = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("Could not find Jwt key");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest) {
            // Edge cases
            if (!_dbconnection.IsConnect()) {
                return StatusCode(500, new { message = "Could not connect to database" });
            }

            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password)) {
                return BadRequest(new { message = "All fields must be filled" });
            }

            User user = AuthenticateUser(loginRequest.Email, loginRequest.Password);
            if (user == null) {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            string token = GenerateJwtToken(user);
            return Ok(new {
                token = token,
                id = user.Id,
            });
        }

        /// <summary>
        /// Check the Authentication and validation of the users email and password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns>null if the db isnt connected or if the the login is invalid</returns>
        private User AuthenticateUser(string email, string password) {
            if (!_dbconnection.IsConnect()) {
                return null;
            }

            // TODO: In production, NEVER store or compare passwords in plain text
            // Use password hashing (e.g., with BCrypt or ASP.NET Core Identity)
            string query = "SELECT * FROM users WHERE Email = @Email AND Password = @Password";
            using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);
                using (var reader = cmd.ExecuteReader()) {
                    if (reader.Read()) {
                        reader.Close();
                        _dbconnection.CloseConnection();
                        return UserService.ReaderToUser(reader);
                    }
                    reader.Close();
                }
            }
            _dbconnection.CloseConnection();
            return null;
        }

        private string GenerateJwtToken(User user) {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30), 
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}