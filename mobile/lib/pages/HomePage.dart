import 'package:flutter/material.dart';
import 'package:mobile/API/BookController.dart';
import 'package:mobile/sections/Footer.dart';

class HomePage extends StatefulWidget{
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}


class _HomePageState extends State<HomePage>{
  String books = '';
  bool isLoading = true;
  String errorMessage = '';

  Future<void> updateBooks() async{
    try {
      BookController bookController = BookController();
      var res = await bookController.getAll();
      print('res: $res');
      if (res.statusCode != 200) {
        setState(() {
          errorMessage = 'Backend error';
          isLoading = false;
        });
        return;
      }
      setState(() {
        books = res.body;
        isLoading = false;
      });
    } catch (e) {
      print('error');
      setState(() {
        errorMessage = 'Failed to load books';
        isLoading = false;
      });
    }
  }
  @override
  void initState() {
    super.initState();
    updateBooks();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: TextButton(onPressed: updateBooks, child: Text("Refresh")),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage.isNotEmpty
          ? Center(child: Text(errorMessage))
          : books.isEmpty
          ? const Center(child: Text("No Books available"))
          : ListView.builder(
            itemCount: books.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(books[index].toString()
              ),
          );
        },
      ),
      bottomNavigationBar: const Footer(),
    );
  }
}
