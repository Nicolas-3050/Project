import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';

class CheckAccount extends StatelessWidget {
  final bool login;
  final VoidCallback press;
  const CheckAccount({
    Key? key,
    this.login = true,
    required this.press,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text(
          login
              ? "Vous n'avez pas de compte ? "
              : "Vous avez déjà un compte ? ",
          style: const TextStyle(color: Colors.black),
        ),
        GestureDetector(
          onTap: press,
          child: Text(
            login ? "S'inscrire" : "Se connecter",
            style: const TextStyle(
              color: Colors.black,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
        )
      ],
    );
  }
}
