import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'Controller.dart';
import 'package:http/http.dart' as http;

class BookController extends Controller {
  final backendHost = dotenv.env['BACKEND_HOST'];

  @override
  Future<http.Response> getAll() async {
    if (backendHost == null) {
      throw Exception("Could not connect");
    }
    Uri url = Uri.parse('$backendHost/book');
    return get(url);
  }

  Future<http.Response> getMostRecentBook(int userId) async{
    if (backendHost == null) {
      throw Exception("Could not connect");
    }
    Uri url = Uri.parse('$backendHost/book/most-recent/$userId');
    return get(url);
  }
}