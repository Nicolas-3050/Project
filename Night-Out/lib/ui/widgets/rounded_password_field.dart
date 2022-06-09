import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/text_field_container.dart';

class RoundedPasswordField extends StatefulWidget {
  final TextEditingController textEditingController;

  const RoundedPasswordField({
    Key? key,
    required this.textEditingController,
  }) : super(key: key);

  @override
  State<RoundedPasswordField> createState() => _RoundedPasswordFieldState();
}

class _RoundedPasswordFieldState extends State<RoundedPasswordField> {
  bool _passwordVisible = false;

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: TextField(
        obscureText: !_passwordVisible,
        controller: widget.textEditingController,
        decoration: InputDecoration(
          border: InputBorder.none,
          icon: const Icon(
            Icons.lock,
            color: kPrimaryColor,
          ),
          hintText: "Mot de passe",
          suffixIcon: IconButton(
            splashRadius: 10,
            icon: Icon(
              _passwordVisible ? Icons.visibility : Icons.visibility_off,
              color: kPrimaryColor,
            ),
            onPressed: () {
              setState(() {
                _passwordVisible = !_passwordVisible;
              });
              },
          ),
        ),
      ),
    );
  }
}