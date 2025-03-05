import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/API/BookController.dart';
import 'package:mobile/sections/Footer.dart';
import 'package:mobile/sections/BookLayout.dart';
class HomePage extends StatefulWidget{
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}


class _HomePageState extends State<HomePage>{
  var books = [];
  bool isLoading = true;
  String errorMessage = '';

  Future<void> updateBooks() async{
    try {
      BookController bookController = BookController();
      var res = await bookController.getAll();
      if (res.statusCode != 200) {
        setState(() {
          errorMessage = 'Backend error';
          isLoading = false;
        });
        return;
      }
      setState(() {
        books = jsonDecode(res.body);
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
      appBar: AppBar(
        title: TextButton(onPressed: updateBooks, child: Text("Refresh")),
      ),
      //Loading screen during fetch
      body: isLoading ? const Center(child: CircularProgressIndicator())
        //Show any error message given
        : errorMessage.isNotEmpty ? Center(child: Text(errorMessage))
        //Handle if there is no error message but books still could not load
        : books.isEmpty ? const Center(child: Text("No Books available"))

        //Handle succesful fetch
        : Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: BookLayout().ListAllBooks(books),
            ),
          ],
        ),
      bottomNavigationBar: const Footer(),
    );
  }
}
