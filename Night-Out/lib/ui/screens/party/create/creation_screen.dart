import 'package:flutter/material.dart';

import 'widgets/party_edition.dart';

class PartyCreationScreen extends StatefulWidget {
  const PartyCreationScreen({Key? key}): super(key: key);

  @override
  _PartyCreationState createState() => _PartyCreationState();
}

class _PartyCreationState extends State<PartyCreationScreen> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SingleChildScrollView(
        child: PartyEditor()
      ),
    );
  }
}