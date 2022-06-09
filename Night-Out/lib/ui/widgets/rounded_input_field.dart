import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/text_field_container.dart';

class RoundedInputField extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final TextEditingController textEditingController;
  final int? maxLines;
  final TextInputType? keyboardType;
  final double? height;
  final bool enabled;
  final GestureTapCallback? onTap;
  final Function(String)? onChange;
  const RoundedInputField({
    Key? key,
    required this.hintText,
    this.icon = Icons.person,
    required this.textEditingController,
    this.maxLines = 1,
    this.keyboardType,
    this.height,
    this.enabled = true,
    this.onTap,
    this.onChange,

}) : super(key : key);

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      height: height,
      child: TextField(
        enabled: enabled,
        onChanged: onChange,
        onTap: onTap,
        keyboardType: keyboardType,
        maxLines: maxLines,
        controller: textEditingController,
        decoration: InputDecoration(
          icon: Icon(
            icon,
            color: kPrimaryColor,
          ),
          hintText: hintText,
          border: InputBorder.none,
        )
      )
    );
  }
}