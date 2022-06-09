import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/constants/colors.dart';

class RoundedActionButton extends StatelessWidget {
  final String text;
  final String image;
  final Function() onPress;

  const RoundedActionButton({
    Key? key,
    required this.text,
    required this.image,
    required this.onPress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      borderRadius: BorderRadius.circular(28),
      clipBehavior: Clip.antiAliasWithSaveLayer,
      color: kPrimaryColor,
      elevation: 8,
      child: InkWell(
          splashColor: Colors.black26,
          onTap: onPress,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                decoration: BoxDecoration(
                  color: Colors.transparent,
                  borderRadius: BorderRadius.circular(28),
                ),
                child: Ink.image(
                  image: AssetImage(image),
                  height: 230,
                  width: 230,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                text,
                textAlign: TextAlign.center,
                style: GoogleFonts.josefinSans(
                  fontSize: 20,
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          )),
    );
  }
}
