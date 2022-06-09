import 'package:cloud_firestore/cloud_firestore.dart';

class PartyRepository {
  PartyRepository({
    FirebaseFirestore? firebaseFirestore,
  }) : _firestore = firebaseFirestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  Future<bool> addParty(
      {required String name,
      required String description,
      required String place,
      required String dateTime,
      required String owner}) async {
    CollectionReference parties = _firestore.collection('parties');
    await parties.add({
      'name': name,
      'description': description,
      'place': place,
      'dateTime': dateTime,
      'owner': owner,
      'participants': [owner]
    });
    return true;
  }

  Future<bool> addParticipant(
      {required String partyID, required String userID}) async {

    CollectionReference parties = _firestore.collection('parties');
    await parties.doc(partyID).update({
      'participants': FieldValue.arrayUnion([userID])
    });
    return true;
  }

  Future<bool> removeParticipant(
      {required String partyID, required String userID}) async {

    CollectionReference parties = _firestore.collection('parties');
    await parties.doc(partyID).update({
      'participants': FieldValue.arrayRemove([userID])
    });
    return true;
  }

  Future<bool> removeParty({required String id}) async {
    CollectionReference parties = _firestore.collection('parties');
    try {
      await parties.doc(id).delete();
      return true;
    } catch (_) {
      return false;
    }
  }
}
