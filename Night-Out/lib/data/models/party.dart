import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';

class Party extends Equatable {
  final String id;
  final String name;
  final String description;
  final String place;
  final String dateTime;
  final String owner;
  final List<String> participants;

  Party({
    this.id = '',
    this.name = '',
    this.description = '',
    this.place = '',
    this.dateTime = '',
    this.owner = '',
    this.participants = const [],
  });

  @override
  List<Object> get props => [id];

  static Party fromDocument(DocumentSnapshot document) {
    Map<String, dynamic> data = document.data()! as Map<String, dynamic>;
    return Party(
      id: document.id,
      name: data["name"],
      description: data["description"],
      place: data["place"],
      dateTime: data["dateTime"],
      owner: data["owner"],
      participants: data["participants"].cast<String>(),
    );
  }
}
