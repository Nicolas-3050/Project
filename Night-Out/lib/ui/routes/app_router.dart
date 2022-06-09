import 'package:flutter/material.dart';

import 'package:night_out/ui/screens/welcome/welcome_screen.dart';
import 'package:night_out/ui/screens/login/login_screen.dart';
import 'package:night_out/ui/screens/register/register_screen.dart';
import 'package:night_out/ui/screens/home/home_screen.dart';
import 'package:night_out/ui/screens/party/create/creation_screen.dart';
import 'package:night_out/ui/screens/party/find/find_party_screen.dart';
import 'package:night_out/ui/screens/party/show/show_party.dart';
import 'package:night_out/ui/screens/splash/splash_screen.dart';
import 'package:night_out/ui/screens/game/players/players_screen.dart';
import 'package:night_out/ui/screens/game/games_screen.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/truth_or_dare_screen.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/choose_truth_or_dare_screen.dart';
import 'package:night_out/ui/screens/game/bottle/spin_bottle.dart';
import 'package:night_out/ui/screens/game/wheel/wheel_game_screen.dart';

class AppRouter {
  Route? onGeneratedRoutes(RouteSettings routeSettings) {
    switch (routeSettings.name) {
      case '/':
        return MaterialPageRoute(
          builder: (_) => const SplashScreen(),
        );
      case '/welcome':
        return MaterialPageRoute(
          builder: (_) => const WelcomeScreen(),
        );
      case '/login':
        return MaterialPageRoute(
          builder: (_) => const LoginScreen(),
        );
      case '/register':
        return MaterialPageRoute(
          builder: (_) => const RegisterScreen(),
        );
      case '/home':
        return MaterialPageRoute(
          builder: (_) => const HomeScreen(),
        );
      case '/parties':
        return MaterialPageRoute(
          builder: (_) => const FindPartyScreen(),
        );
      case '/party':
        return MaterialPageRoute(
          builder: (_) => const ShowParty(),
          settings: routeSettings,
        );
      case '/party/create':
        return MaterialPageRoute(
          builder: (_) => const PartyCreationScreen(),
        );
      case '/game/players':
        return MaterialPageRoute(
          builder: (_) => const PlayersScreen(),
          settings: routeSettings,
        );
      case '/games':
        return MaterialPageRoute(
          builder: (_) => const GamesScreen(),
          settings: routeSettings,
        );
      case '/game/choose-truth-or-dare':
        return MaterialPageRoute(
          builder: (_) => const ChooseTruthOrDareScreen(),
          settings: routeSettings,
        );
      case '/game/truth-or-dare':
        return MaterialPageRoute(
          builder: (_) => const TruthOrDareScreen(),
          settings: routeSettings,
        );
      case '/game/spin-the-bottle':
        return MaterialPageRoute(
          builder: (_) => const SpinBottleScreen(),
          settings: routeSettings,
        );
      case '/game/wheel':
        return MaterialPageRoute(
          builder: (_) => const WheelGameScreen(),
          settings: routeSettings,
        );
      default:
        return null;
    }
  }
}
