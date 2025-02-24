///<summary>A class that host the database context</summary>
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;   

namespace backend.Data {
    public class AppDbContext {
        private readonly string connectionString;
        public MySqlConnection Connection { get; private set; }

        public AppDbContext(IConfiguration configuration) {
            connectionString = configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("Database conn string not found");
            Connection = new MySqlConnection(connectionString);
        }

        public bool IsConnect() {
            try {
                if (Connection.State == System.Data.ConnectionState.Closed) {
                    Connection.Open();
                }
            } catch (Exception e) {
                Console.WriteLine("Error connecting to DB " + e);
                return false;
            }
            return Connection.State == System.Data.ConnectionState.Open;
        }

        public void CloseConnection() {
            if  (Connection.State == System.Data.ConnectionState.Open) {
                Connection.Close();

            }
        }
    }
}