import 'package:flutter/material.dart';
import 'package:night_out/business_logic/truth_or_dare/truth_or_dare_cubit.dart';
import 'package:night_out/ui/screens/game/truth_or_dare/args/player_args.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:night_out/constants/colors.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:night_out/ui/widgets/rounded_input_field.dart';

class PlayersScreen extends StatefulWidget {
  const PlayersScreen({Key? key}) : super(key: key);

  @override
  _PlayersScreenState createState() => _PlayersScreenState();
}

class _PlayersScreenState extends State<PlayersScreen> {
  final List<String> playerList = [];
  final textFieldValueHolder = TextEditingController();

  String playerValue = "";

  showAlert(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Erreur lors de la saisie du nom'),
          content: const Text('Le champs nom ne peut pas être vide'),
          actions: <Widget>[
            RoundedButton(
              text: "Ok",
              press: () {
                Navigator.of(context).pop();
              },
              color: kPrimaryLightColor,
              textColor: Colors.black,
            ),
          ],
        );
      },
    );
  }

  void addPlayer() {
    if (textFieldValueHolder.text == '') {
      showAlert(context);
    } else {
      setState(() {
        playerList.add(textFieldValueHolder.text);
        textFieldValueHolder.text = "";
        playerValue = "";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                    width: size.width * 0.7,
                    child: RoundedInputField(
                      hintText: "Ajouter un joueur",
                      textEditingController: textFieldValueHolder,
                      onChange: (newValue) {
                        setState(() {
                          playerValue = newValue;
                        });
                      },
                    )),
                IconButton(
                  onPressed: playerValue.isNotEmpty ? addPlayer : null,
                  icon: const Icon(Icons.add),
                ),
                IconButton(
                  onPressed: playerList.length > 1 && playerValue.isEmpty
                      ? () {
                          print(playerList);
                          Navigator.of(context).pushNamed('/games',
                              arguments: PlayersArguments(players: playerList));
                          context.read<TruthOrDareCubit>().getTruthsAndDares();
                        }
                      : null,
                  icon: const Icon(Icons.check),
                )
              ],
            ),
            Expanded(
              child: ListView.builder(
                itemCount: playerList.length,
                itemBuilder: (context, index) {
                  final item = playerList[index];
                  return Dismissible(
                    key: Key(item),
                    onDismissed: (direction) {
                      setState(() {
                        playerList.removeAt(index);
                      });
                    },
                    background: Container(
                      color: Colors.red,
                      alignment: Alignment.centerRight,
                      child: const Padding(
                        padding: EdgeInsets.only(right: 32),
                        child: Icon(Icons.delete),
                      ),
                    ),
                    child: Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: ListTile(
                        title: Text(item),
                        leading: const Icon(Icons.account_circle),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
