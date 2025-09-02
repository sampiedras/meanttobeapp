import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import _ from "@/@lodash/@lodash";
import { GradientButton, TextInputAnimated } from "@/components";
import { ContainerSafeArea } from "@/components/ContainerSafeArea/ContainerSafeArea";
import { colorsLight } from "@/theme/colorsLight";
import { RootStackRoutes, RootStackScreenProps } from "@/types/stackRoutes";
import { loginEmailScreenCopies } from "@/utils/copies";
import { useActionsLoginEmail } from "./useActions";

export const LoginEmailScreen = (
  props: RootStackScreenProps<RootStackRoutes.LOGIN_EMAIL>,
) => {
  const {
    control,
    isValid,
    dirtyFields,
    errors,
    loading,
    handleSubmit,
    handleAuthentication,
  } = useActionsLoginEmail(props);

  return (
    <ContainerSafeArea>
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
});
