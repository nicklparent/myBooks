import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:mobile/API/Controller.dart';
import 'package:http/http.dart' as http;

class BookController extends Controller{

  @override
  Future<http.Response> getAll() async{
    await main();
    final backendHost = dotenv.env['BACKEND_HOST'];

    if (backendHost == null) throw Exception("Backend Host could not be found");

    final url = Uri.parse('$backendHost/books');
    return http.get(url);
  }
}