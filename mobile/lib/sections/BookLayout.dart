import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BookLayout{
  Widget ListAllBooks(List<dynamic> books){
    return ListView.builder(
      itemCount: books.length,
      itemBuilder: (context, index){
        var book = books[index];
        return Card(
          margin: const EdgeInsets.all(10.0),
          child: ListTile(
            title: Text(book['title'] ?? 'No Title Available'),
            subtitle: Text(book['author'] ?? 'No Author Available'),
            trailing: Text(book['description'] ?? 'No Description Available'),
            onTap: () {

            },
          ),
        );
      }
    );
  }
}