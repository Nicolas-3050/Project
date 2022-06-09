import 'package:flutter/material.dart';
import 'widgets/body.dart';

class GamesScreen extends StatelessWidget {
  const GamesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Body(),
      ),
    );
  }
}
