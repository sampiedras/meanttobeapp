import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useController } from "react-hook-form";
import { RadioButtonCheckIcon, RadioButtonIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewGenderFragment = () => {
  const { control } = useViewModelProvider();

  const { field } = useController({
    control,
    defaultValue: "",
    name: "gender",
    rules: {
      required: true,
    },
  });

  return (
    <View style={[styles.container, styles.paddingH16]}>
      <Text variant="h6" style={styles.title}>
        What is your gender?
      </Text>

      <TouchableOpacity
        style={[
          styles.rowCenterV,
          styles.radioButton,
          {
            borderColor:
              field.value === "FEMALE"
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange("FEMALE")}
      >
        <Text variant="body1" style={styles.textRadio}>
          Female
        </Text>
        {field.value === "FEMALE" ? (
          <RadioButtonCheckIcon />
        ) : (
          <RadioButtonIcon />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.rowCenterV,
          styles.radioButton,
          {
            borderColor:
              field.value === "MALE"
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange("MALE")}
      >
        <Text variant="body1" style={styles.textRadio}>
          Male
        </Text>
        {field.value === "MALE" ? (
          <RadioButtonCheckIcon />
        ) : (
          <RadioButtonIcon />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
  },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  paddingH16: { paddingHorizontal: 16 },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  radioButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  textRadio: {
    fontFamily: "Satoshi-Medium",
  },
});
