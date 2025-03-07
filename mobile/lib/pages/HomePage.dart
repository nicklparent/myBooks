import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/API/BookController.dart';
import 'package:mobile/sections/Footer.dart';
import 'package:mobile/sections/BookLayout.dart';
import 'package:mobile/sections/Header.dart';
import 'package:mobile/pages/AppPage.dart';

class HomePage extends AppPage {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends AppPageState<HomePage> {
  List books = [];
  bool isLoading = true;
  String errorMessage = '';

  @override
  Future<void> initialize() async {
    await updateBooks();
  }

  Future<void> updateBooks() async {
    while (isLoading){
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
          : Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Header(),
          Expanded(child: BookLayout().ListAllBooks(books, context)),
        ],
      ),
      bottomNavigationBar: const Footer(),
    );
  }
}
