import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/delayed_animation.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';

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
          DelayedAnimation(
              delay: 200,
              child: Image.asset(
                "assets/images/logo.png",
                height: size.height * 0.6,
              ),
          ),
          SizedBox(
            height: size.height * 0.05,
          ),
          SizedBox(
            child: DelayedAnimation(
              delay: 500,
              child: RoundedButton(
                text: "CONNEXION",
                press: () {
                  Navigator.of(context).pushNamed('/login');
                },
                color: kPrimaryColor,
                textColor: Colors.black,
              ),
            ),
          ),
          SizedBox(
            child:DelayedAnimation(
              delay: 700,
              child: RoundedButton(
                text: "INSCRIPTION",
                press: () {
                  Navigator.of(context).pushNamed('/register');
                },
                color: kPrimaryLightColor,
                textColor: Colors.black,
              ),
            ),
          )
        ],
      )
    );
  }
}
