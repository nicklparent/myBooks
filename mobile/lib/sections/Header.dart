import 'dart:ffi';

import 'package:flutter/material.dart';

class Header extends StatefulWidget{
  const Header({super.key});

  @override
  State<StatefulWidget> createState() => _HeaderState();
}

class _HeaderState extends State<Header> {

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return
      Container(
        padding: EdgeInsets.symmetric(vertical: 7.0, horizontal: 1.0),
        decoration: BoxDecoration(
          color: Colors.brown[700],
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(14.0),
            bottomRight: Radius.circular(14.0)
          ),
          border: Border(bottom: BorderSide(color: Colors.black, width: 3.0))
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            TextButton(
              child: Text("MyBooks",
                style: TextStyle(
                  color: Colors.white70,
                  fontSize: 20.0,
                  letterSpacing: 0.5,
                ),
              ),
              onPressed: (){
                //TODO
                //Redirect to home page same as footer
              },
            ),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 10.0),
              child: SizedBox(
                height: 40.0,
                width: 200.0,
                child: SearchAnchor(

                  builder: (context, SearchController controller) {
                    return SearchBar(
                      controller: controller,
                      padding: const WidgetStatePropertyAll<EdgeInsets>(
                          EdgeInsets.symmetric(horizontal: 10.0)
                      ),
                      onTap: () {
                        controller.openView();
                      },
                      onChanged: (_) {
                        controller.openView();
                      },
                      leading: Icon(Icons.search),
                    );
                  },
                  //TODO
                  //Make Actually pull recommended books and users
                  //currently like this to make compiler happy
                  suggestionsBuilder: (context, SearchController controller){
                    return List<ListTile>.generate(5, (int index){
                      final String item = "item $index";
                      return ListTile(title: Text(item),
                        onTap: () {
                          setState(() {
                            controller.closeView(item);
                          });
                        },
                      );
                    });
                  },
                ),
              ),
            ),
          ],
        )
      );
  }
}