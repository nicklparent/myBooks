﻿using backend.Data;
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
                            Id = !reader.IsDBNull(reader.GetOrdinal("Id")) ? reader.GetInt32("Id") : 0,
                            RatingScore = !reader.IsDBNull(reader.GetOrdinal("Rating")) ? reader.GetDouble("Rating") : 0.0,
                            Review = !reader.IsDBNull(reader.GetOrdinal("Review")) ? reader.GetString("Review") : "No Review Available",
                            UserId = !reader.IsDBNull(reader.GetOrdinal("UserId")) ? reader.GetInt32("UserId") : 0,
                            BookId = !reader.IsDBNull(reader.GetOrdinal("BookId")) ? reader.GetInt32("BookId") : 0,
                        });
                    }
                }
            }
            return ratings;
        }

        [HttpGet("{BookId}")]
        public IEnumerable<Rating> GetBookIdRating(int BookId) {
            var ratings = new List<Rating>();

            if (_dbconnection.IsConnect()) {
                string query = "SELECT * FROM ratings WHERE BookId = @BookId";
                using (var cmd = new MySqlCommand(query, _dbconnection.Connection)) {
                    cmd.Parameters.AddWithValue("@BookId", BookId);
                    using (var reader = cmd.ExecuteReader()) {
                        while (reader.Read()) {
                            ratings.Add(new Rating
                            {
                                Id = reader.GetInt32("Id"),
                                RatingScore = reader.GetInt32("Rating"),

                            });
                        }
                    }
                }
            }

            return ratings;
        }
    }
}
