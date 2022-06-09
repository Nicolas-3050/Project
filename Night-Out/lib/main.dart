import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/business_logic/truth_or_dare/truth_or_dare_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/repositories/auth/authentication_repository.dart';
import 'package:night_out/repositories/party/PartyRepository.dart';
import 'package:night_out/ui/routes/app_router.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  final AppRouter _appRouter = AppRouter();
  final AuthenticationRepository _authenticationRepository =
      AuthenticationRepository();
  runApp(MyApp(
      appRouter: _appRouter,
      authenticationRepository: _authenticationRepository));
}

class MyApp extends StatelessWidget {
  const MyApp(
      {Key? key,
      required AppRouter appRouter,
      required AuthenticationRepository authenticationRepository})
      : _appRouter = appRouter,
        _authenticationRepository = authenticationRepository,
        super(key: key);

  final AppRouter _appRouter;
  final AuthenticationRepository _authenticationRepository;

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (authenticationCubitContext) => AuthenticationCubit(
            authenticationRepository: _authenticationRepository,
          ),
          lazy: false,
        ),
        BlocProvider(
          create: (truthOrDareContext) => TruthOrDareCubit(),
        ),
      ],
      child: MultiProvider(
        providers: [
          Provider<PartyRepository>(
            create: (_) => PartyRepository(),
          ),
          Provider<AuthenticationRepository>(
            create: (_) => _authenticationRepository,
          ),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Night Out',
          theme: ThemeData(
            primaryColor: kPrimaryColor,
            scaffoldBackgroundColor: kBackgroundColor,
          ),
          onGenerateRoute: _appRouter.onGeneratedRoutes,
        ),
      ),
    );
  }
}
