import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:flutter/foundation.dart';
import 'package:meta/meta.dart';
import 'package:night_out/repositories/auth/authentication_repository.dart';
import 'package:night_out/repositories/auth/models/user.dart';

part 'authentication_state.dart';

class AuthenticationCubit extends Cubit<AuthenticationState> {
  final AuthenticationRepository _authenticationRepository;
  late final StreamSubscription _streamSubscription;

  AuthenticationCubit(
      {required AuthenticationRepository authenticationRepository})
      : _authenticationRepository = authenticationRepository,
        super(Uninitialized()) {
    monitorAuthenticationState();
  }

  void monitorAuthenticationState() {
    _streamSubscription = _authenticationRepository.user.listen((user) {
      if (user.isEmpty) {
        emit(Unauthenticated());
      } else {
        emit(Authenticated(user: user));
      }
    });
  }

  void signUpWithEmailAndPassword(
      String email, String password, String name) async {
    emit(Authenticating());
    await _authenticationRepository
        .signUp(email: email, password: password, name: name)
        .catchError((e) {
      emit(AuthenticationError(error: e.message));
    });
  }

  void loginWithEmailAndPassword(String email, String password) async {
    emit(Authenticating());
    await _authenticationRepository
        .logInWithEmailAndPassword(email: email, password: password)
        .catchError((e) {
      emit(AuthenticationError(error: e.message));
    });
  }

  void logout() async {
    await _authenticationRepository.logOut();
  }

  User user() {
    return _authenticationRepository.currentUser;
  }

  @override
  Future<void> close() {
    _streamSubscription.cancel();
    return super.close();
  }
}
