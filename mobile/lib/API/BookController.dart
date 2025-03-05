import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Controller.dart';
import 'package:http/http.dart' as http;

class BookController extends Controller {
  @override
  Future<http.Response> getAll() async {
    print('Fetching books...');

    final backendHost = dotenv.env['BACKEND_HOST'];
    print('Backend Host: $backendHost');

    if (backendHost == null) {
      throw Exception("Backend Host could not be found in environment variables.");
    }

    Uri url = Uri.parse('$backendHost/book');
    print('Request URL: $url');

    try {
      final response = await http.get(url);
      print('Response received: ${response.statusCode}');
      return response;
    } catch (e) {
      print('Error fetching books: $e');
      throw Exception("Failed to fetch books: $e");
    }
  }
}