import 'package:flutter/material.dart';
import 'package:night_out/ui/screens/home/widgets/body.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: Body(),
      ),
    );
  }
}
