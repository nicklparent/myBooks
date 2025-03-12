import 'package:flutter/material.dart';

class BookLayout {

  Widget ListAllBooks(List<dynamic> books, BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    return ListView.builder(
      itemCount: books.length,
      itemBuilder: (context, index) {
        var book = books[index];
        return SizedBox(
          height: screenHeight * 0.12,
          child: Container(
            margin: const EdgeInsets.all(10.0),
            padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 4.0),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: Colors.grey.shade300, width: 1),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.1),
                  blurRadius: 4,
                  offset: const Offset(2, 2),
                ),
              ],
            ),
            child: ListTile(
              leading: ClipRRect(
                borderRadius: BorderRadius.circular(5),
                child: FadeInImage.assetNetwork(
                  placeholder: 'assets/book-default.png',
                  image: book['coverImageUrl'] ?? '',
                  width: screenWidth * 0.1,
                  height: screenHeight * 0.15,
                  fit: BoxFit.cover,
                  imageErrorBuilder: (context, error, stacktrace) {
                    return Image.asset(
                      'assets/book-default.png',
                      width: screenWidth * 0.15,
                      height: screenHeight * 0.15,
                      fit: BoxFit.cover,
                    );
                  },
                ),
              ),
              title: Text(book['title'] ?? 'No Title Available',
                  maxLines: 1, overflow: TextOverflow.ellipsis),
              subtitle: Text(book['author'] ?? 'No Author Available',
                  maxLines: 1, overflow: TextOverflow.ellipsis),
              trailing: SizedBox(
                width: screenWidth * 0.3, // Limit trailing text width
                child: Text(
                  book['description'] ?? 'No Description Available',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.right,
                ),
              ),
              onTap: () {
                //TODO
                // Handle book tap action
              },
            ),
          ),
        );
      },
    );
  }

  Widget MostRecentlyRead(Map<String, dynamic> book, BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;

    return Container(
      height: screenHeight * 0.25,
      margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 5.0),
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all<Color>(Color(0x9f743100)),
          shape: WidgetStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16.0),
              side: BorderSide(color: Colors.black),
            ),
          ),
        ),
        onPressed: () {
          // TODO: Add functionality
        },
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [

            ],
          ),
        ),
      ),
    );
  }
}
