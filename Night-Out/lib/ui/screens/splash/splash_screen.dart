import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return BlocListener<AuthenticationCubit, AuthenticationState>(
      listener: (context, state) {
        if (state is Authenticated) {
          Navigator.of(context).pushNamed('/home');
          return;
        }
        if (state is Unauthenticated) {
          Navigator.of(context).pushNamed('/welcome');
          return;
        }
      },
      child: Scaffold(
        body: Center(
          child: Image.asset(
            "assets/images/logo.png",
            height: size.height * 0.6,
          ),
        ),
      ),
    );
  }
}
