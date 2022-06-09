import 'package:flutter/material.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/rounded_action_button.dart';
import 'package:night_out/ui/widgets/delayed_animation.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:provider/src/provider.dart';

class Body extends StatelessWidget {
  const Body({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size; //Size of our screen
    return SizedBox(
      height: size.height,
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          SizedBox(height: size.height * 0.05),
          DelayedAnimation(
            delay: 200,
            child: RoundedActionButton(
              text: "JOUER",
              image: "assets/images/play_logo.png",
              onPress: () {
                Navigator.of(context).pushNamed("/game/players");
              },
            ),
          ),

          SizedBox(height: size.height * 0.02),
          DelayedAnimation(
            delay: 500,
            child: RoundedActionButton(
              text: "ORGANISER",
              image: "assets/images/party_logo.png",
              onPress: () {
                Navigator.of(context).pushNamed("/parties");
              },
            ),
          ),

          SizedBox(height: size.height * 0.05),
          DelayedAnimation(
            delay: 900,
            child: RoundedButton(
              text: "SE DECONNECTER",
              press: () {
                context.read<AuthenticationCubit>().logout();
              },
              color: kPrimaryLightColor,
              textColor: Colors.black,
            ),
          ),
        ],
      ),
    );
  }
}
