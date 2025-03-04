import 'package:flutter/material.dart';

class Footer extends StatelessWidget{
  const Footer({super.key});
  final double buttonSize = 30.0;
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return(
      Container(
        color: Colors.brown[400],
        height: 65,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [

            // Home Button
            IconButton(
              icon: Icon(Icons.book),
              iconSize: buttonSize,
              onPressed: (){

              },
            ),

            // Collection Button
            IconButton(
              icon: Icon(Icons.shelves),
              iconSize: buttonSize,
              onPressed: (){

              },
            ),

            // Explore Button
            IconButton(
              icon: Icon(Icons.explore_sharp),
              iconSize: buttonSize,
              onPressed: (){

              },
            ),

            // Social button
            IconButton(
              icon: Icon(Icons.people),
              iconSize: buttonSize,
              onPressed: (){

              },
            ),
            // Profile Button
            IconButton(
              icon: Icon(Icons.person),
              iconSize: buttonSize,
              onPressed: (){

              },
            )
          ],
        ),
      )
    );
  }
}