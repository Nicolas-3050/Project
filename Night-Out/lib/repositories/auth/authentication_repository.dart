import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:firebase_auth_platform_interface/firebase_auth_platform_interface.dart';

import 'exceptions/login_email_password_exception.dart';
import 'exceptions/logout_exception.dart';
import 'exceptions/sign_up_email_password_exception.dart';
import 'models/user.dart';

class AuthenticationRepository {
  AuthenticationRepository({
    FirebaseFirestore? firebaseFirestore,
    firebase_auth.FirebaseAuth? firebaseAuth,
  })  : _firebaseAuth = firebaseAuth ?? firebase_auth.FirebaseAuth.instance,
        _firestore = firebaseFirestore ?? FirebaseFirestore.instance;

  final firebase_auth.FirebaseAuth _firebaseAuth;
  final FirebaseFirestore _firestore;
  User _currentUser = User.empty;

  Stream<User> get user {
    return _firebaseAuth.authStateChanges().map((firebaseUser) {
      final user = firebaseUser == null ? User.empty : firebaseUser.toUser;
      _currentUser = user;
      return user;
    });
  }

  User get currentUser {
    return _currentUser;
  }

  Future<void> signUp(
      {required String email,
      required String password,
      required String name}) async {
    try {
      CollectionReference users = _firestore.collection('users');
      firebase_auth.UserCredential credential =
          await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      await users.doc(credential.user?.uid).set({
        'name': name,
        'email': email,
        'id': credential.user?.uid,
      });
    } on FirebaseAuthException catch (e) {
      throw SignUpWithEmailAndPasswordFailure.fromCode(e.code);
    } catch (_) {
      throw const SignUpWithEmailAndPasswordFailure();
    }
  }

  Future<void> logInWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    try {
      await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      throw LogInWithEmailAndPasswordFailure.fromCode(e.code);
    } catch (_) {
      throw const LogInWithEmailAndPasswordFailure();
    }
  }

  Future<void> logOut() async {
    try {
      await Future.wait([
        _firebaseAuth.signOut(),
      ]);
    } catch (_) {
      throw LogOutFailure();
    }
  }

  Future<User> getUserFromId(String userID) async {
    CollectionReference users = _firestore.collection('users');
    var user = await users.doc(userID).get();
    return User.fromJson(user.data()! as Map<String, dynamic>);
  }
}

extension on firebase_auth.User {
  User get toUser {
    return User(id: uid, email: email, name: displayName);
  }
}
