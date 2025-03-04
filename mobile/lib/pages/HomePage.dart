import 'package:flutter/material.dart';
import 'package:mobile/sections/Footer.dart';

class HomePage extends StatelessWidget{
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {

    return(
        Scaffold(
          body: Column(

          ),
          bottomNavigationBar: Footer(),
        )
    );
  }
}