//A class that host the database context
using MySql.Data;
using MySql.Data.MySqlClient;   

namespace backend.Data {
    public class AppDbContext {
        private AppDbContext() { }

        public string server { get; set; }
        public string database { get; set; }
        public string user { get; set; }
        public string password { get; set; }

        public MySqlConnection Connection { get; set; }

        private static AppDbContext _instance = null;
        
    }
}