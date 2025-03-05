import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
abstract class Controller{

  Future<http.Response> getAll();
}

