import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
abstract class Controller{

  Future<http.Response> getAll();
  Future<http.Response> get(Uri url) async{
    try {
      final response = await http.get(url);
      return response;
    } catch(e) {
      throw Exception("Could not get url");
    }
  }

}

