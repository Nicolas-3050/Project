import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/constants/colors.dart';

class RoundedButton extends StatelessWidget {
  final String text;
  final VoidCallback press;
  final Color color, textColor;
  final bool loading;

  const RoundedButton({
    Key? key,
    required this.text,
    required this.press,
    required this.color,
    required this.textColor,
    this.loading = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    if (loading) {
      return const CircularProgressIndicator(
        color: kPrimaryColor,
      );
    }
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      width: size.width * 0.8,
      child: ClipRRect(
        //borderRadius: BorderRadius.circular(30),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            primary: color,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          onPressed: press,
          child: Text(
            text,
            style: GoogleFonts.josefinSans(
              color: textColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
