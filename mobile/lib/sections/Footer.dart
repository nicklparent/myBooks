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
          ElevatedButton(
            child: Icon(Icons.home_filled),
            onPressed: (){

            },
          ),

          // Collection Button
          ElevatedButton(
            child: Icon(Icons.shelves),
            onPressed: (){

            },
          ),

          // Explore Button
          ElevatedButton(
            child: Icon(Icons.explore_sharp),
            onPressed: (){

            },
          ),

          // Social button
          ElevatedButton(
            child: Icon(Icons.people),
            onPressed: (){

            },
          ),
          // Profile Button
          ElevatedButton(
            child: Icon(Icons.person),
            onPressed: (){

            },
          )
        ],
      )
    );
  }
}