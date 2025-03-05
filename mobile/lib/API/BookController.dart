import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Controller.dart';
import 'package:http/http.dart' as http;

class BookController extends Controller {
  @override
  Future<http.Response> getAll() async {

    final backendHost = dotenv.env['BACKEND_HOST'];

    if (backendHost == null) {
      throw Exception("Backend Host could not be found in environment variables.");
    }

    Uri url = Uri.parse('$backendHost/book');
    try {
      final response = await http.get(url);
      print('response: $response');
      return response;
    } catch (e) {
      print('response failed');
      throw Exception("Failed to fetch books: $e");
    }
  }
}