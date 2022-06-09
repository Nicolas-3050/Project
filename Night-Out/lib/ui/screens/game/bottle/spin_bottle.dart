import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_fortune_wheel/flutter_fortune_wheel.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/selected_action_args.dart';

class SpinBottleScreen extends StatefulWidget {
  const SpinBottleScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _SpinBottleScreen();
}

class _SpinBottleScreen extends State<SpinBottleScreen>
    with TickerProviderStateMixin {

  @override
  void initState() {
    super.initState();
    animationController =
        AnimationController(vsync: this, duration: const Duration(seconds: 0));
    animationController.forward();
  }

  var endSpinBottle = 0.0;
  var nombreTour = 0.0;
  var valuePlayer = 0.0;
  var random = Random();
  var selectedPlayerName = "";
  var isBottleEnabled = false;

  late AnimationController animationController;
  late PlayersArguments args;

  double getRandomSpinBottle() {
    if (!isBottleEnabled) return endSpinBottle;
    nombreTour = random.nextInt(8).roundToDouble();
    valuePlayer = double.parse(random.nextDouble().toStringAsFixed(2));
    endSpinBottle = valuePlayer + nombreTour;

    int selectedPlayerInt = ((endSpinBottle % 1) * pow(10, 2)).floor();
    selectedPlayerName = "";
    List<Map<String, dynamic>> playersValuePosition = [];
    double startCurrentPosition = 100 / (args.players.length * 2);
    double currentPosition = startCurrentPosition;
    int index = 0;
    for (var element in args.players) {
      if (index == 0) {
        index++;
        continue;
      }
      playersValuePosition.add({
        "name": element,
        "start": currentPosition,
        "end": currentPosition + 2 * startCurrentPosition
      });
      currentPosition = currentPosition + 2 * startCurrentPosition;
    }
    print(playersValuePosition);
    for (var element in playersValuePosition) {
      if (selectedPlayerInt >= element["start"] &&
          selectedPlayerInt <= element["end"]) {
        selectedPlayerName = element["name"];
        break;
      }
    }
    if (selectedPlayerName.isEmpty) {
      selectedPlayerName = args.players.first;
    }
    print(selectedPlayerName);
    return endSpinBottle;
  }

  spinBottle() {
    setState(() {
      isBottleEnabled = true;
    });
    animationController =
        AnimationController(vsync: this, duration: const Duration(seconds: 2));
    animationController.forward();
    animationController.addListener(() {
      if (animationController.isCompleted) {
        Future.delayed(const Duration(seconds: 2), () async {
          Navigator.of(context).pushNamed(
            '/game/truth-or-dare',
            arguments: SelectedActionArgs(
              action: 'truth-dare',
              players: [selectedPlayerName],
            ),
          );
          setState(() {
            isBottleEnabled = false;
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    args = ModalRoute.of(context)!.settings.arguments as PlayersArguments;
    return Scaffold(
      body: Stack(
        alignment: Alignment.center,
        children: <Widget>[
          SizedBox(
            child: FortuneWheel(
              animateFirst: false,
              items: [
                for (var it in args.players) FortuneItem(child: Text(it)),
              ],
              indicators: const <FortuneIndicator>[
                FortuneIndicator(
                  child: TriangleIndicator(
                    color: Colors.transparent,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            child: RotationTransition(
              turns: Tween(
                begin: valuePlayer,
                end: getRandomSpinBottle(),
              ).animate(
                CurvedAnimation(
                  parent: animationController,
                  curve: Curves.easeInOut,
                ),
              ),
              child: GestureDetector(
                onTap: () {
                  if (animationController.isCompleted && !isBottleEnabled) {
                    setState(() {
                      spinBottle();
                    });
                  }
                },
                child: Image.asset(
                  'assets/images/bottle.png',
                  width: 250,
                  height: 250,
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
