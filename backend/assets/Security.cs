using System.Text.RegularExpressions;

namespace backend.assets {
    public class Security {
        private readonly string defaultAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ1234567890_-";

        public string SqlReWrite(string str) {
            string pattern = "";

            Regex reg = new Regex(pattern);
            if (reg.IsMatch(str)) {
                
            }
            return str;
        }
        /// <summary>
        /// Checks a string for if it contains only valid characters
        /// </summary>
        /// <param name="str">Takes in the string to be checked</param>
        /// <param name="validChars">Takes in the valid characters to be compared and checked through</param>
        /// <returns>True if the string only contains characters in the valid string, false otherwise</returns>
        public bool CheckValidChars (string str, string validChars) {

            for (int i = 0; i < str.Length; ++i) {
                if (!validChars.Contains(str[i])) {
                    return false;
                }
            }

            return true;
        }
        /// <summary>
        /// Helper method for the CheckValidChars method with a defualt validChars
        /// </summary>
        /// <param name="str"></param>
        /// <returns>True if the string only contains the default alphabet, false otherwise</returns>
        public bool CheckValidChars(string str) {
            return CheckValidChars(str, defaultAlphabet);
        }

        /// <summary>
        /// Removes any illegal characters from a string 
        /// </summary>
        /// <param name="str">the string to be modified</param>
        /// <param name="validChars">the string of valid characters</param>
        /// <returns>A new string based on the original with all of the illegal characters removed</returns>
        public string SanitizeInput(string str, string validChars) {
            return new string(str.Where(c => validChars.Contains(c)).ToArray());
        }
        /// <summary>
        /// Helper method for Sanitize input with a default alphabet of validChars
        /// </summary>
        /// <param name="str">The string to be sanitized</param>
        /// <returns>A new string based on the original with all of the illegal characters removed</returns>
        public string SanitizeInput(string str) {
            return new string(str.Where(c => defaultAlphabet.Contains(c)).ToArray());
        }
    }
}