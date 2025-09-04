import React from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Text } from "@react-native-material/core";
import _ from "lodash";
import { useController } from "react-hook-form";
import { View } from "react-native-ui-lib";
import { AppContainerSafeArea, AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_UserStackRoutes } from "@/user";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const StoryContent =
  ({}: RootStackScreenProps<E_UserStackRoutes.STORY>) => {
    const {
      control,
      errors,
      loading,
      isValid,
      dirtyFields,
      handleSubmit,
      handleUpdateStory,
    } = useViewModelProvider();

    const { field } = useController({
      control,
      defaultValue: "",
      name: "story",
      rules: {
        required: true,
      },
    });

    return (
      <AppContainerSafeArea>
        <View style={styles.container} paddingH-16>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Text variant="h6" style={styles.title}>
              Share your story with the world
            </Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                value={field.value}
                multiline
                numberOfLines={4}
                maxLength={750}
                placeholder="Your story"
                placeholderTextColor={colorsLight.GRAY_ONBOARDING}
                onChangeText={field.onChange}
              />
            </View>
            {!!errors?.story && (
              <Text style={styles.textError}>{errors?.story?.message}</Text>
            )}
          </ScrollView>
          <AppGradientButton
            loading={loading}
            label="Save changes"
            height={50}
            disabled={_.isEmpty(dirtyFields) || !isValid}
            style={styles.button}
            onPress={handleSubmit(handleUpdateStory)}
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },
  scroll: {
    flex: 1,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  boxInput: {
    width: "100%",
    padding: 16,
    minHeight: 140,
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
  button: {
    marginBottom: 18,
    paddingHorizontal: 10,
  },
});

export const StoryScreen = (
  props: RootStackScreenProps<E_UserStackRoutes.STORY>,
) => (
  <ViewModelProvider>
    <StoryContent {...props} />
  </ViewModelProvider>
);
