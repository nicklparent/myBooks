import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
abstract class Controller{
  Future<void> main() async{
    await dotenv.load(fileName: ".env");
  }

  Future<http.Response> getAll();
}

