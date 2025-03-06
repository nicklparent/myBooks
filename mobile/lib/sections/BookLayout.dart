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
            leading: FadeInImage.assetNetwork(
              placeholder: 'assets/book-default.png', // Placeholder image
              image: book['coverImageUrl'] ?? '',
              width: 50,
              height: 80,
              fit: BoxFit.cover,
              imageErrorBuilder: (context, error, stacktrace) {
                return Image.asset('assets/book-default.png');
              },
            ),
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

  Widget MostRecentlyRead(List<dynamic> book){
    return Container(

    );
  }
}