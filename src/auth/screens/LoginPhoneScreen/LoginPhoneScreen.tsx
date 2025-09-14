import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import _ from "lodash";
import { AuthStackRoutes } from "@/auth/routes";
import {
  AppContainerSafeArea,
  AppGradientButton,
  SelectPickerCountry,
  TextInputAnimated,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { loginPhoneScreenCopies } from "@/core/utils/copies";
import { useViewModelProvider, ViewModelProvider } from "./viewModelContext";

export const LoginPhoneContent =
  ({}: RootStackScreenProps<AuthStackRoutes.LOGIN_PHONE>) => {
    const {
      control,
      isValid,
      dirtyFields,
      errors,
      loading,
      countrySelected,
      setCountrySelected,
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
            {loginPhoneScreenCopies.title}
          </Text>
          <SelectPickerCountry
            label="Country / Region"
            countrySelected={countrySelected}
            setCountrySelected={setCountrySelected}
          />
          <TextInputAnimated
            name="phone_number"
            label="Enter your phone number"
            keyboardType="numeric"
            control={control}
            error={!!errors?.phone_number}
            helperTextError={errors?.phone_number?.message}
            required
            containerStyle={styles.input}
          />
          <Text variant="body2" style={styles.text}>
            You´ll receive a 6 digit code to verify next.
          </Text>
        </ScrollView>
        <View style={styles.marginH16}>
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
  input: {
    marginTop: 8,
  },
  marginH16: { marginHorizontal: 16 },
});

export const LoginPhoneScreen = (
  props: RootStackScreenProps<AuthStackRoutes.LOGIN_PHONE>,
) => (
  <ViewModelProvider>
    <LoginPhoneContent {...props} />
  </ViewModelProvider>
);
