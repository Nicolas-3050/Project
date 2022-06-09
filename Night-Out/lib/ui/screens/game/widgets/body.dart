import 'package:flutter/material.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/widgets/rounded_action_button.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:provider/src/provider.dart';

class Body extends StatelessWidget {
  const Body({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final args = ModalRoute.of(context)!.settings.arguments as PlayersArguments;
    return SizedBox(
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RoundedActionButton(
              text: "Action ou vérité",
              image: "assets/images/party_logo.png",
              onPress: () {
                Navigator.of(context).pushNamed('/game/choose-truth-or-dare',
                    arguments: PlayersArguments(players: args.players));
              },
            ),
            SizedBox(height: size.height * 0.02),
            RoundedActionButton(
              text: "Jeu de la bouteille",
              image: "assets/images/party_logo.png",
              onPress: () {
                Navigator.of(context).pushNamed('/game/spin-the-bottle',
                    arguments: PlayersArguments(players: args.players));
              },
            ),
            SizedBox(height: size.height * 0.02),
            RoundedActionButton(
              text: "Roue de la fortune",
              image: "assets/images/party_logo.png",
              onPress: () {
                Navigator.of(context).pushNamed('/game/wheel',
                    arguments: PlayersArguments(players: args.players));
              },
            ),
          ],
        ),
      ),
    );
  }
}
