import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/business_logic/truth_or_dare/truth_or_dare_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/repositories/auth/authentication_repository.dart';
import 'package:night_out/repositories/auth/models/user.dart';
import 'package:night_out/repositories/party/PartyRepository.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/screens/party/show/widgets/icon_text.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:provider/provider.dart';
import 'args/show_party_args.dart';

class ShowParty extends StatefulWidget {
  const ShowParty({Key? key}) : super(key: key);

  @override
  _ShowPartyState createState() => _ShowPartyState();
}

class _ShowPartyState extends State<ShowParty> {
  final imageSize = "500";
  bool userAlreadyInParty = false;
  bool isLoadingGame = false;

  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)!.settings.arguments as ShowPartyArguments;
    final partyRepository = Provider.of<PartyRepository>(context);
    final authRepository = Provider.of<AuthenticationRepository>(context);
    final authCubit = context.read<AuthenticationCubit>();
    bool isOwner = args.party.owner == authCubit.user().id;

    setState(() {
      userAlreadyInParty =
          args.party.participants.contains(authCubit.user().id);
    });

    Future<Map<String, dynamic>> fetchCoordinateFromPlace() async {
      final response = await http.get(Uri.parse(
          "https://api.opencagedata.com/geocode/v1/json?q=${args.party.place}&key=2df719ff1679448eba04f309d77008a2&language=fr&pretty=1&no_annotations=1"));

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load album');
      }
    }

    String getMapboxImageFromCoordinate(String lat, String lon) {
      return "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555($lon,$lat)/$lon,$lat,11,0/${imageSize}x$imageSize?access_token=pk.eyJ1IjoidG91bG91emVuIiwiYSI6ImNreDdiMm9oeTJubnEycXB6amp2MjQ3NTkifQ.9rhOsN9V4Xx_F2OWBGil3Q";
    }

    var baseTextStyle = GoogleFonts.josefinSans();
    final headerTextStyle = baseTextStyle.copyWith(
        color: Colors.black, fontSize: 28.0, fontWeight: FontWeight.w600);
    final regularTextStyle = baseTextStyle.copyWith(
        color: Colors.black87, fontSize: 12, fontWeight: FontWeight.w400);
    final subHeaderTextStyle = regularTextStyle.copyWith(fontSize: 16.0);

    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              FutureBuilder<Map<String, dynamic>>(
                future: fetchCoordinateFromPlace(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    final imageLink = getMapboxImageFromCoordinate(
                        snapshot.data!["results"][0]["geometry"]["lat"]
                            .toString(),
                        snapshot.data!["results"][0]["geometry"]["lng"]
                            .toString());
                    return FadeInImage.assetNetwork(
                      placeholder: 'assets/images/loading_map.png',
                      image: imageLink,
                    );
                  } else if (snapshot.hasError) {
                    return FadeInImage.assetNetwork(
                      placeholder: 'assets/images/loading_map.png',
                      image: "https://fakeimg.pl/$imageSize/?text=Erreur",
                    );
                  }
                  return Image.asset(
                    'assets/images/loading_map.png',
                  );
                },
              ),
              Container(
                margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      args.party.name,
                      style: headerTextStyle,
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    Text(
                      args.party.description,
                      style: subHeaderTextStyle,
                    ),
                    const SizedBox(
                      height: 8,
                    ),
                    IconText(
                        text: "Date : ${args.party.dateTime}",
                        iconData: Icons.calendar_today),
                    const SizedBox(
                      height: 8,
                    ),
                    IconText(
                        text: "Localisation : ${args.party.place}",
                        iconData: Icons.place),
                    const SizedBox(
                      height: 32,
                    ),
                    Center(
                      child: RoundedButton(
                          text: isOwner
                              ? "Supprimer".toUpperCase()
                              : userAlreadyInParty
                                  ? "Quitter".toUpperCase()
                                  : "Rejoindre".toUpperCase(),
                          press: () async {
                            if (isOwner) {
                              await partyRepository.removeParty(
                                id: args.party.id,
                              );
                              Navigator.of(context).pop();
                            }
                            if (userAlreadyInParty) {
                              await partyRepository.removeParticipant(
                                partyID: args.party.id,
                                userID: authCubit.user().id,
                              );
                              setState(() {
                                args.party.participants.remove(
                                  authCubit.user().id,
                                );
                                userAlreadyInParty = false;
                              });
                              return;
                            }
                            if (await partyRepository.addParticipant(
                              partyID: args.party.id,
                              userID: authCubit.user().id,
                            )) {
                              setState(() {
                                args.party.participants.add(
                                  authCubit.user().id,
                                );
                                userAlreadyInParty = true;
                              });
                            }
                          },
                          color: kPrimaryColor,
                          textColor: Colors.black),
                    ),
                    if (isOwner)
                      Center(
                        child: RoundedButton(
                            text: "Jouer".toUpperCase(),
                            press: () async {
                              setState(() {
                                isLoadingGame = true;
                              });
                              List<String> userList = [];
                              for (var userID in args.party.participants) {
                                User user =
                                    await authRepository.getUserFromId(userID);
                                userList.add(user.name!);
                              }
                              setState(() {
                                isLoadingGame = false;
                              });
                              context
                                  .read<TruthOrDareCubit>()
                                  .getTruthsAndDares();
                              Navigator.of(context).pushNamed(
                                '/games',
                                arguments: PlayersArguments(players: userList),
                              );
                            },
                            loading: isLoadingGame,
                            color: kPrimaryColor,
                            textColor: Colors.black),
                      ),
                    const SizedBox(
                      height: 32,
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
