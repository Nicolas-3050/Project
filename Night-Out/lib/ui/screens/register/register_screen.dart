import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/ui/screens/register/widgets/body.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthenticationCubit, AuthenticationState>(
      listenWhen: (previousState, state) {
        return previousState is! AuthenticationError && state is AuthenticationError;
      },
      listener: (context, state) {
        if (state is AuthenticationError) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(state.error),
              duration: const Duration(seconds: 2),
            ),
          );
        }
      },
      child: Scaffold(
        body: SingleChildScrollView(
          child: Body(),
        ),
      ),
    );
  }
}
