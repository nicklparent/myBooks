import 'dart:js_interop';

import 'package:flutter/material.dart';
import 'package:mobile/API/BookController.dart';
import 'package:mobile/sections/Footer.dart';

class HomePage extends StatefulWidget{
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}


class _HomePageState extends State<HomePage>{
  List<dynamic> books = [];

  Future<void> updateBooks() async{
    try {
      BookController bookController = new BookController();
      var res = await bookController.getAll();

      books[0] = res.body;
    } catch (e) {
      books = [];
    }
  }
  @override
  void initState() {
    updateBooks();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    return(
        Scaffold(
          body: Column(
            children: [
              ListView.builder(
                  itemCount: books.length,
                  itemBuilder: (context, index) {
                    return ListTile(

                    );
                  }
              )
            ],
          ),
          bottomNavigationBar: Footer(),
        )
    );
  }
}
