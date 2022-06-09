import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/repositories/party/PartyRepository.dart';
import 'package:night_out/ui/widgets/rounded_date_time_field.dart';
import 'package:night_out/ui/widgets/rounded_button.dart';
import 'package:night_out/ui/widgets/rounded_input_field.dart';
import 'package:provider/provider.dart';

class PartyEditor extends StatefulWidget {
  const PartyEditor({Key? key}) : super(key: key);

  @override
  _PartyEditorState createState() => _PartyEditorState();
}

class _PartyEditorState extends State<PartyEditor> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController dateController = TextEditingController();
  final TextEditingController timeController = TextEditingController();
  final TextEditingController placeController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final partyRepository = Provider.of<PartyRepository>(context);
    return SizedBox(
      height: size.height,
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          SizedBox(height: size.height * 0.05),
          Text('Créer une soirée',
              style: GoogleFonts.josefinSans(
                fontSize: 24,
                color: Colors.black,
                fontWeight: FontWeight.bold,
              )),
          RoundedInputField(
            hintText: 'Nom de la soirée',
            textEditingController: nameController,
          ),
          RoundedDateTimeField(
            hintText: 'Date et heure de la soirée',
            textEditingController: dateController,
          ),
          RoundedInputField(
            hintText: 'Lieu de la soirée',
            textEditingController: placeController,
          ),
          RoundedInputField(
            hintText: 'Description de la soirée',
            textEditingController: descriptionController,
            maxLines: null,
            keyboardType: TextInputType.multiline,
            height: 150,
          ),
          SizedBox(height: size.height * 0.03),
          RoundedButton(
            text: 'Créer',
            press: () {
              partyRepository
                  .addParty(
                    name: nameController.text,
                    description: descriptionController.text,
                    place: placeController.text,
                    dateTime: dateController.text,
                    owner: context.read<AuthenticationCubit>().user().id,
                  )
                  .then((value) => Navigator.of(context).pop());
            },
            color: kPrimaryColor,
            textColor: Colors.black,
          ),
        ],
      ),
    );
  }
}
