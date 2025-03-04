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
      BookController bookController = new BookController();
      var res = await bookController.getAll();

      setState(() {
        books = res.body;
        isLoading = false;
      });
    } catch (e) {
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
            title: Text(books[index].toString()),
          );
        },
      ),
      bottomNavigationBar: const Footer(),
    );
  }
}
