import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { format, parseISO } from "date-fns";
import { useController } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewBirthdayFragment = () => {
  const { control, errors, getValues } = useViewModelProvider();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { field } = useController({
    control,
    defaultValue: "",
    name: "birthday",
    rules: {
      required: true,
    },
  });

  const onChange = (selectedDate: Date) => {
    setShow(false);
    setDate(selectedDate);

    // TODO:
    const today = new Date();
    const birthDate = new Date(selectedDate);
    const ageDifference = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayOccurred =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    const age = hasBirthdayOccurred ? ageDifference : ageDifference - 1;

    if (age >= 13) {
      Alert.alert(
        `Are you ${age} years old?`,
        "Make sure this is your correct age as you can’t change this later.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => field.onChange(selectedDate.toISOString()),
          },
        ],
      );
    } else {
      Alert.alert(
        `${age} years is not a valid age.`,
        "Please enter a valid age",
        [
          {
            text: "Ok",
            onPress: () => field.onChange(() => null),
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        Hi, {getValues("name")}, when’s your birthday?
      </Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text
          style={styles.textPicker}
          color={
            field.value
              ? colorsLight.PRIMARY_TEXT_COLOR
              : colorsLight.GRAY_ONBOARDING
          }
        >
          {field.value
            ? format(parseISO(field.value), "dd/MM/yyyy")
            : "DD MM YYYY"}
        </Text>
      </TouchableOpacity>
      {!!errors?.name && (
        <Text style={styles.textError}>{errors?.birthday?.message}</Text>
      )}
      {show && (
        <DateTimePickerModal
          date={date}
          isVisible={show}
          mode="date"
          display="spinner"
          onConfirm={onChange}
          onCancel={() => setShow(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  textPicker: {
    fontSize: 32,
    marginTop: 24,
    width: "80%",
    textAlign: "center",
    fontFamily: "Satoshi-Black",
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    marginLeft: 16,
    fontFamily: "Satoshi-Regular",
  },
});
