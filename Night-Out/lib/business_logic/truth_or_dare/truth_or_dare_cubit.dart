import 'package:bloc/bloc.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:night_out/data/models/truth_or_dare.dart';

part 'truth_or_dare_state.dart';

class TruthOrDareCubit extends Cubit<TruthOrDareState> {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  TruthOrDareCubit() : super(TruthOrDareState(truths: [], dares: []));

  void getTruthsAndDares() async {
    List<TruthOrDare> truths = [];
    QuerySnapshot<Map<String, dynamic>> truthQuerySnapshot =
        await _firestore.collection('truths').get();
    for (var doc in truthQuerySnapshot.docs) {
      TruthOrDare truth = TruthOrDare.fromDocument(doc);
      truths.add(truth);
    }
    List<TruthOrDare> dares = [];
    QuerySnapshot<Map<String, dynamic>> daresQuerySnapshot =
        await _firestore.collection('dares').get();
    for (var doc in daresQuerySnapshot.docs) {
      TruthOrDare dare = TruthOrDare.fromDocument(doc);
      dares.add(dare);
    }
    emit(TruthOrDareState(truths: truths, dares: dares));
  }
}
