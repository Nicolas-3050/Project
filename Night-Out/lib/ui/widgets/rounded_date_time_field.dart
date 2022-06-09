import 'package:date_time_picker/date_time_picker.dart';
import 'package:flutter/material.dart';
import 'package:night_out/constants/colors.dart';
import 'package:night_out/ui/widgets/text_field_container.dart';

class RoundedDateTimeField extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final TextEditingController textEditingController;
  final DateTimePickerType? dateTimePickerType;

  const RoundedDateTimeField(
      {Key? key,
      this.hintText = 'Date et heure de la soire',
      this.icon = Icons.event,
      required this.textEditingController,
      this.dateTimePickerType})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: DateTimePicker(
        type: DateTimePickerType.dateTime,
        dateMask: 'd MMMM yyyy à HH:mm',
        controller: textEditingController,
        firstDate: DateTime(2000),
        lastDate: DateTime(2100),
        icon: Icon(
          icon,
          color: kPrimaryColor,
        ),
        dateLabelText: 'Date',
        timeLabelText: "Hour",
        selectableDayPredicate: (date) => true,
        decoration: InputDecoration(
          icon: Icon(
            icon,
            color: kPrimaryColor,
          ),
          hintText: hintText,
          border: InputBorder.none,
        ),
      ),
    );
  }
}
