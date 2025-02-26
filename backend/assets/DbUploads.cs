using backend.Data;

namespace backend.assets {
    public class DbUploads {
        private readonly AppDbContext _dbconnection;

        public DbUploads(AppDbContext _dbconnection) {
            this._dbconnection = _dbconnection;
        }

        public void CSVToDB(string filepath) {
            if (!File.Exists(filepath)) {
                throw new Exception("Error: file could not be opened");
            }


            using(StreamReader reader = new StreamReader(filepath)) {
                string line;
                bool headerLine = true;
                while ((line = reader.ReadLine()) != null) {
                    if (headerLine) {
                        headerLine = false;
                        continue;
                    }

                    string[] values = ParseCSVLine(line);
                }
            }
            
        }

        private string[] ParseCSVLine(string line) {
            var values = new List<string>();
            bool inQuotes = false;
            string curr = "";

            foreach(char c in line) {
                //track opening and closing brackets
                if (c == '\"') {
                    inQuotes = !inQuotes;
                } else if (c == ',' && !inQuotes) {
                    values.Add(curr.Trim());
                    curr = "";
                } else {
                    curr += c;
                }
            }

            values.Add(curr.Trim());
            return values.ToArray();
        }
    }
}
