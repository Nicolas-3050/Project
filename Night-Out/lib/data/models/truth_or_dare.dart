import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:equatable/equatable.dart';

class TruthOrDare extends Equatable {
  final String id;
  final String difficulty;
  final String title;

  const TruthOrDare({
    this.id = '',
    this.difficulty = '',
    this.title = '',
  });

  @override
  List<Object> get props => [title];

  static TruthOrDare fromDocument(DocumentSnapshot document) {
    Map<String, dynamic> data = document.data()! as Map<String, dynamic>;
    return TruthOrDare(
      id: document.id,
      difficulty: data["difficulty"],
      title: data["title"],
    );
  }
}
