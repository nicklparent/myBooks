using backend.Data;
using backend.Models;
using backend.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
                var tokenKey = Encoding.UTF8.GetBytes(key);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim(ClaimTypes.Name, user.FirstName.ToString() ?? "")
                };

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(30),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature)
                };


            }

            return StatusCode(500, "Something went wrong");
        }
    }
}
