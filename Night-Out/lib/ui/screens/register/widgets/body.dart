import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/account_check.dart';
import 'package:night_out/ui/widgets/delayed_animation.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:night_out/ui/widgets/rounded_input_field.dart';
import 'package:night_out/ui/widgets/rounded_password_field.dart';
import "package:flutter_bloc/flutter_bloc.dart";

class Body extends StatelessWidget {
  Body({Key? key}) : super(key: key);

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController nameController = TextEditingController();

  void onCheckAccountPressed(BuildContext context) {
    Navigator.of(context).pushNamed('/login');
  }

  void onSignUpButtonPressed(BuildContext context) {
    context.read<AuthenticationCubit>().signUpWithEmailAndPassword(
        emailController.text, passwordController.text, nameController.text);
  }

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
              child: Text(
                "INSCRIPTION",
                style: GoogleFonts.josefinSans(
                  fontSize: 30,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
          ),
          SizedBox(height: size.height * 0.05),
          DelayedAnimation(
            delay: 200,
            child: SvgPicture.asset(
              "assets/images/register_logo.svg",
              height: size.height * 0.3,
            ),
          ),

          SizedBox(height: size.height * 0.01),
          DelayedAnimation(
            delay: 500,
            child:  RoundedInputField(
              hintText: "Votre prénom",
              textEditingController: nameController,
            ),
          ),

          SizedBox(height: size.height * 0.005),
          DelayedAnimation(
            delay: 600,
            child: RoundedInputField(
              hintText: "Votre adresse mail",
              textEditingController: emailController,
            ),
          ),

          SizedBox(height: size.height * 0.005),
          DelayedAnimation(
            delay: 700,
            child: RoundedPasswordField(
              textEditingController: passwordController,
            ),
          ),

          SizedBox(height: size.height * 0.01),
          DelayedAnimation(
            delay: 900,
            child: RoundedButton(
              text: "INSCRIPTION",
              press: () =>onSignUpButtonPressed(context),
              color: kPrimaryColor,
              textColor: Colors.black,
            ),
          ),

          SizedBox(height: size.height * 0.01),
          DelayedAnimation(
            delay: 900,
            child: CheckAccount(
              login: false,
              press: () => onCheckAccountPressed(context),
            ),
          ),
        ],
      ),
    );
  }
}
