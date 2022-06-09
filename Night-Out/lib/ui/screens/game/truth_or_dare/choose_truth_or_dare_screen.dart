import 'dart:math';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/selected_action_args.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:night_out/constants/colors.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ChooseTruthOrDareScreen extends StatefulWidget {
  const ChooseTruthOrDareScreen({Key? key}) : super(key: key);

  @override
  _ChooseTruthOrDareScreenState createState() =>
      _ChooseTruthOrDareScreenState();
}

class _ChooseTruthOrDareScreenState extends State<ChooseTruthOrDareScreen> {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as PlayersArguments;
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              RoundedButton(
                text: "Action",
                press: () {
                  Navigator.of(context).pushNamed(
                    '/game/truth-or-dare',
                    arguments: SelectedActionArgs(action: 'dare', players: args.players),
                  );
                },
                color: kPrimaryLightColor,
                textColor: Colors.black,
              ),
              RoundedButton(
                text: "Vérité",
                press: () {
                  Navigator.of(context).pushNamed(
                    '/game/truth-or-dare',
                    arguments: SelectedActionArgs(action: 'truth', players: args.players),
                  );
                },
                color: kPrimaryLightColor,
                textColor: Colors.black,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
