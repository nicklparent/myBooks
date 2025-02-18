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

        public static AppDbContext Instance() {
            if (_instance == null) {
                _instance = new AppDbContext();
            }
            return _instance;
        }

        public bool IsConnected() {
            if (Connection == null) {
                string connSring = string.Format("Server={0}; database={1}; user={2}; password={3}", server, database, user, password);
                Connection = new MySqlConnection(connSring);
                Connection.Open();
            }
            return true;
        }

        public void Close() {
            Connection.Close();
        }
    }
}