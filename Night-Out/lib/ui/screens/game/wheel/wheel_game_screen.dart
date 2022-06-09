import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_fortune_wheel/flutter_fortune_wheel.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/selected_action_args.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';

class WheelGameScreen extends StatefulWidget {
  const WheelGameScreen({Key? key}) : super(key: key);

  @override
  _WheelGameScreenState createState() => _WheelGameScreenState();
}

class _WheelGameScreenState extends State<WheelGameScreen> {
  StreamController<int> controller = StreamController<int>();
  bool isWheelTurning = false;
  int selected = 0;

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as PlayersArguments;
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          SizedBox(
            height: 300,
            child: FortuneWheel(
              animateFirst: false,
              selected: controller.stream,
              physics: CircularPanPhysics(
                duration: const Duration(seconds: 1),
                curve: Curves.decelerate,
              ),
              items: [
                for (var it in args.players) FortuneItem(child: Text(it)),
              ],
              onAnimationStart: () {
                setState(() {
                  isWheelTurning = true;
                });
              },
              onAnimationEnd: () {
                Future.delayed(const Duration(seconds: 2), () async {
                  Navigator.of(context).pushNamed(
                    '/game/truth-or-dare',
                    arguments: SelectedActionArgs(
                      action: 'truth-dare',
                      players: [args.players[selected]],
                    ),
                  );
                  setState(() {
                    isWheelTurning = false;
                  });
                });
              },
            ),
          ),
          if (!isWheelTurning)
            RoundedButton(
              text: "Lancer".toUpperCase(),
              press: () {
                selected = Random().nextInt(args.players.length);
                setState(() {
                  controller.add(selected);
                });
              },
              color: kPrimaryColor,
              textColor: Colors.black,
            ),
        ],
      ),
    );
  }
}
