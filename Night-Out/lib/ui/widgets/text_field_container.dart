import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';

class TextFieldContainer extends StatelessWidget {
  final Widget child;
  final double? height;
  const TextFieldContainer({
     Key? key,
    required this.child,
    this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 5),
      width: size.width * 0.8,
      height: height,
      decoration: BoxDecoration(
        color: kPrimaryLightColor,
        
        borderRadius: BorderRadius.circular(10),
      ),
      child: child,
    );
  }
}