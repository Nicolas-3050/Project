part of 'authentication_cubit.dart';

@immutable
abstract class AuthenticationState {}

class Uninitialized extends AuthenticationState {}

class Authenticated extends AuthenticationState {
  final User user;

  Authenticated({required this.user});
}

class AuthenticationError extends AuthenticationState {
  final String error;

  AuthenticationError({required this.error});
}

class Authenticating extends AuthenticationState {}

class Unauthenticated extends AuthenticationState {}
