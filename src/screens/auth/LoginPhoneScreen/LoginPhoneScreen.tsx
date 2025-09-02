import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import _ from "@/@lodash/@lodash";
import {
  GradientButton,
  SelectPickerCountry,
  TextInputAnimated,
} from "@/components";
import { ContainerSafeArea } from "@/components/ContainerSafeArea/ContainerSafeArea";
import { colorsLight } from "@/theme/colorsLight";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";
import { loginPhoneScreenCopies } from "@/utils/copies";
import { useActionsLoginPhone } from "./useActions";

export const LoginPhoneScreen = (
  props: RootStackScreenProps<RootStackRoutes.LOGIN_PHONE>,
) => {
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
  } = useActionsLoginPhone(props);

  return (
    <ContainerSafeArea>
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
      <View marginH-16>
        <GradientButton
          label="Continue"
          loading={loading}
          disabled={_.isEmpty(dirtyFields) || !isValid}
          style={styles.button}
          onPress={handleSubmit(handleAuthentication)}
        />
      </View>
    </ContainerSafeArea>
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
});
