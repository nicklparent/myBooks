import 'package:flutter/material.dart';

class Footer extends StatelessWidget{
  const Footer({super.key});
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return(
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [

          // Home Button
          IconButton(
            icon: Icon(Icons.home_filled),
            onPressed: (){

            },
          ),

          // Collection Button
          IconButton(
            icon: Icon(Icons.shelves),
            onPressed: (){

            },
          ),

          // Explore Button
          IconButton(
            icon: Icon(Icons.explore_sharp),
            onPressed: (){

            },
          ),

          // Social button
          IconButton(
            icon: Icon(Icons.people),
            onPressed: (){

            },
          ),
          // Profile Button
          IconButton(
            icon: Icon(Icons.person),
            onPressed: (){

            },
          )
        ],
      )
    );
  }
}