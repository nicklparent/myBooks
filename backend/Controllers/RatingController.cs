using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RatingController : Controller {
        private readonly AppDbContext _dbconnection;

        public RatingController(AppDbContext _dbconnection) {
            this._dbconnection = _dbconnection;
        }

        [HttpGet]
        public IEnumerable<Rating> GetAllRatings() {
            var ratings = new List<Rating>();

            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM ratings";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection))
                using (var reader = cmd.ExecuteReader()) {
                    while (reader.Read()) {
                        ratings.Add(new Rating
                        {
                            Id = reader.GetInt32("Id"),
                            RatingScore = reader.GetDouble("Rating"),
                            UserId = reader.GetInt32("UserId"),
                            BookId = reader.GetInt32("BookId"),
                        });
                    }
                }
            }
            return ratings;
        }
    }
}
