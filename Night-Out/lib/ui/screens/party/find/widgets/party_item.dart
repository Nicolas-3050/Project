import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/data/models/party.dart';

class PartyItem extends StatelessWidget {
  final Party party;

  const PartyItem({Key? key, required this.party}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var baseTextStyle = GoogleFonts.josefinSans();
    final regularTextStyle = baseTextStyle.copyWith(
        color: Colors.black87, fontSize: 9.0, fontWeight: FontWeight.w400);
    final subHeaderTextStyle = regularTextStyle.copyWith(fontSize: 12.0);
    final headerTextStyle = baseTextStyle.copyWith(
        color: Colors.black, fontSize: 18.0, fontWeight: FontWeight.w600);

    Widget _partySubInformation(
        {required String value, required IconData iconData}) {
      return Row(children: <Widget>[
        Icon(
          iconData,
          color: Colors.black87,
          size: 12.0,
        ),
        Container(width: 8.0),
        Text(value, style: regularTextStyle),
      ]);
    }

    final partyCardContent = Container(
      margin: const EdgeInsets.all(16.0),
      constraints: const BoxConstraints.expand(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(height: 4.0),
          Text(party.name, style: headerTextStyle),
          Container(height: 10.0),
          Text(
            party.description,
            style: subHeaderTextStyle,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            softWrap: false,
          ),
          Container(height: 4.0),
          Container(
            margin: const EdgeInsets.only(bottom: 8.0),
            height: 2.0,
            width: 32.0,
            color: Colors.white,
          ),
          Row(
            children: <Widget>[
              Expanded(
                child: _partySubInformation(
                    value: party.place, iconData: Icons.place),
              ),
              Expanded(
                child: _partySubInformation(
                    value: party.dateTime, iconData: Icons.calendar_today),
              ),
            ],
          ),
        ],
      ),
    );

    final planetCard = Container(
      child: partyCardContent,
      height: 114.0,
      margin: const EdgeInsets.only(left: 0.0),
      decoration: BoxDecoration(
        color: kPrimaryColor,
        shape: BoxShape.rectangle,
        borderRadius: BorderRadius.circular(8.0),
        boxShadow: const <BoxShadow>[
          BoxShadow(
            color: Colors.black12,
            blurRadius: 10.0,
            offset: Offset(0.0, 10.0),
          ),
        ],
      ),
    );

    return Container(
        height: 114.0,
        margin: const EdgeInsets.only(
          top: 16,
          left: 24,
          right: 24,
        ),
        child: Stack(
          children: <Widget>[
            planetCard,
          ],
        ));
  }
}
