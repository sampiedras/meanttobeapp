import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useController } from "react-hook-form";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewNameFragment = () => {
  const { control, errors } = useViewModelProvider();

  const { field } = useController({
    control,
    defaultValue: "",
    name: "name",
    rules: {
      required: true,
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        What is your name?
      </Text>
      <TextInput
        style={styles.input}
        value={field.value}
        placeholder="Your name"
        placeholderTextColor={colorsLight.GRAY_ONBOARDING}
        onChangeText={field.onChange}
      />
      {!!errors?.name && (
        <Text style={styles.textError}>{errors?.name?.message}</Text>
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
  input: {
    fontSize: 32,
    marginTop: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
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
