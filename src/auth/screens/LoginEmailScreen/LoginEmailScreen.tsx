import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import _ from "lodash";
import { View } from "react-native-ui-lib";
import { AuthStackRoutes } from "@/auth/routes";
import {
  AppContainerSafeArea,
  AppGradientButton,
  TextInputAnimated,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { loginEmailScreenCopies } from "@/core/utils/copies";
import { useViewModelProvider, ViewModelProvider } from "./viewModelContext";

export const LoginEmailContent =
  ({}: RootStackScreenProps<AuthStackRoutes.LOGIN_EMAIL>) => {
    const {
      control,
      errors,
      dirtyFields,
      isValid,
      loading,
      handleSubmit,
      handleAuthentication,
    } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerScroll}
        >
          <Text variant="h5" style={styles.title}>
            {loginEmailScreenCopies.title}
          </Text>
          <TextInputAnimated
            name="email"
            label="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            error={!!errors?.email}
            helperTextError={errors?.email?.message}
            required
          />
          <Text variant="body2" style={styles.text}>
            You´ll receive a 6 digit code to verify next.
          </Text>
        </ScrollView>
        <View marginH-16>
          <AppGradientButton
            label="Continue"
            loading={loading}
            disabled={_.isEmpty(dirtyFields) || !isValid}
            style={styles.button}
            onPress={handleSubmit(handleAuthentication)}
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  containerScroll: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "Satoshi-Black",
    textAlign: "left",
    marginVertical: 16,
  },
  text: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginTop: 8,
  },
  button: {
    marginBottom: 16,
  },
});

export const LoginEmailScreen = (
  props: RootStackScreenProps<AuthStackRoutes.LOGIN_EMAIL>,
) => (
  <ViewModelProvider>
    <LoginEmailContent {...props} />
  </ViewModelProvider>
);
