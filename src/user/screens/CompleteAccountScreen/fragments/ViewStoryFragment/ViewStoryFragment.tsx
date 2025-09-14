import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useController } from "react-hook-form";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

export const ViewStoryFragment = () => {
  const { control, errors } = useViewModelProvider();

  const { field } = useController({
    control,
    defaultValue: "",
    name: "story",
    rules: {
      required: true,
    },
  });

  return (
    <View style={[styles.container, styles.paddingHorizontal]}>
      <Text variant="h6" style={styles.title}>
        Share your story with the world
      </Text>
      <View style={styles.boxInput}>
        <TextInput
          style={styles.input}
          value={field.value ?? ""}
          multiline={true}
          numberOfLines={4}
          maxLength={750}
          placeholder="Your story"
          placeholderTextColor={colorsLight.GRAY_ONBOARDING}
          onChangeText={field.onChange}
          textAlignVertical="top"
        />
      </View>
      {!!errors?.story && (
        <Text style={styles.textError}>{errors?.story?.message}</Text>
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
  boxInput: {
    width: "100%",
    padding: 16,
    minHeight: 120,
    borderRadius: 8,
    marginTop: 48,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
  input: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlignVertical: "top",
    fontFamily: "Satoshi-Regular",
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: "Satoshi-Regular",
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
});
