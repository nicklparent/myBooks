import 'package:flutter/material.dart';

abstract class AppPage extends StatefulWidget {
  const AppPage({super.key});
}

abstract class AppPageState<T extends AppPage> extends State<T> {
  int? userId;

  @override
  void initState() {
    super.initState();
    initialize();
  }

  /// Method to be implemented by child classes for initialization
  Future<void> initialize();
}
