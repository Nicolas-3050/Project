import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/business_logic/truth_or_dare/truth_or_dare_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/data/models/truth_or_dare.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/selected_action_args.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';

class TruthOrDareScreen extends StatelessWidget {
  const TruthOrDareScreen({Key? key}) : super(key: key);

  dynamic getRandomItemInList(List<dynamic> list) {
    return list[Random().nextInt(list.length)];
  }

  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as SelectedActionArgs;
    TruthOrDareState truthOrDareState = context.read<TruthOrDareCubit>().state;
    List<TruthOrDare> truthOrDareList = [];
    if (args.action.contains("truth")) {
      truthOrDareList = truthOrDareState.truths;
    }
    if (args.action.contains("dare")) {
      truthOrDareList = truthOrDareState.dares;
    }
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Center(
              child: Text(
                getRandomItemInList(truthOrDareList)
                    .title
                    .toString()
                    .replaceFirst('{{USERNAME}}',
                        getRandomItemInList(args.players).toString()),
                textAlign: TextAlign.center,
                style: GoogleFonts.josefinSans(
                  color: Colors.black,
                  fontSize: 30.0,
                ),
              ),
            ),
            RoundedButton(
              text: "Suivant",
              press: () {
                Navigator.of(context).pop();
              },
              color: kPrimaryLightColor,
              textColor: Colors.black,
            ),
          ],
        ),
      ),
    );
  }
}
