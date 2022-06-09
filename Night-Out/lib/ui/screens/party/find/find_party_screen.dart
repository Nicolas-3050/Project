import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:night_out/business_logic/authentication/authentication_cubit.dart';
import 'package:night_out/data/models/party.dart';
import 'package:night_out/ui/screens/party/show/args/show_party_args.dart';
import 'package:provider/provider.dart';

import 'widgets/party_item.dart';

class FindPartyScreen extends StatefulWidget {
  const FindPartyScreen({Key? key}) : super(key: key);

  @override
  _FindPartyScreenState createState() => _FindPartyScreenState();
}

class _FindPartyScreenState extends State<FindPartyScreen> {
  @override
  Widget build(BuildContext context) {
    final Stream<QuerySnapshot> _partiesStream =
        FirebaseFirestore.instance.collection('parties').snapshots();
    return Scaffold(
      body: StreamBuilder<QuerySnapshot>(
        stream: _partiesStream,
        builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (snapshot.hasError) {
            return const Text('Something went wrong');
          }
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Text("Loading");
          }
          return ListView(
            children: snapshot.data!.docs.map(
              (DocumentSnapshot document) {
                var party = Party.fromDocument(document);
                return InkWell(
                  child: PartyItem(party: party),
                  onTap: () {
                    Navigator.of(context).pushNamed('/party',
                        arguments: ShowPartyArguments(party: party));
                  },
                );
              },
            ).toList(),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Increment',
        child: const Icon(Icons.add),
        onPressed: () => Navigator.of(context).pushNamed('/party/create'),
      ),
    );
  }
}
