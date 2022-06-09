import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class IconText extends StatelessWidget {
  final String text;
  final IconData iconData;
  const IconText({Key? key, required this.text, required this.iconData}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var regularTextStyle = GoogleFonts.josefinSans(
        color: Colors.black87, fontSize: 12, fontWeight: FontWeight.w400
    );
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Icon(
          iconData,
          size: 12,
        ),
        const SizedBox(
          width: 4,
        ),
        Text(
          text,
          style: regularTextStyle,
        )
      ],
    );
  }
}
