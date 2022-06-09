import 'package:equatable/equatable.dart';

class User extends Equatable {
  const User({
    required this.id,
    this.name,
    this.email,
  });

  final String id;
  final String? name;
  final String? email;


  /// Empty user which represents an unauthenticated user.
  static const empty = User(id: '');

  bool get isEmpty => this == User.empty;
  bool get isNotEmpty => !isEmpty;

  @override
  List<Object?> get props => [id, name, email];

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json["id"],
    name: json["name"],
    email: json["email"],
  );
}