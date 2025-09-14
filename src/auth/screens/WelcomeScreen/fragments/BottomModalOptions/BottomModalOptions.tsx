import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { AppleIcon, EmailIcon, PhoneIcon } from "@/auth/assets/svg";
import { AuthStackRoutes } from "@/auth/routes";
import { AppGradientButton, BottomModal, Button } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../viewModelContext";

export const BottomModalOptions = () => {
  const { navigate } = useNavigation();
  const { bottomSheetRef, snapPoints, handleSignInApple } =
    useViewModelProvider();

  return (
    <BottomModal modalRef={bottomSheetRef} snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        <Button
          label="Continue with Phone"
          backgroundColor="#F1F3F4"
          textColor="#1C1C21"
          width="80%"
          iconLeft={<PhoneIcon />}
          style={styles.buttonNavigate}
          onPress={() => {
            bottomSheetRef?.current?.close();
            navigate(AuthStackRoutes.LOGIN_PHONE as never);
          }}
        />
        <Button
          label="Continue with Apple"
          backgroundColor={colorsLight.BLACK}
          textColor={colorsLight.WHITE}
          width="80%"
          iconLeft={<AppleIcon />}
          style={styles.buttonNavigate}
          onPress={handleSignInApple}
        />
        <AppGradientButton
          label="Continue with email"
          fontSize={14}
          width="80%"
          height={44}
          iconLeft={<EmailIcon />}
          style={styles.buttonNavigate}
          onPress={() => {
            bottomSheetRef?.current?.close();
            navigate(AuthStackRoutes.LOGIN_EMAIL as never);
          }}
        />
        <Text
          color={colorsLight.GRAY_03}
          variant="body2"
          style={styles.textContainerTermsPolicy}
        >
          By signing up you will be accepting our{" "}
          <Text
            color={colorsLight.GRAY_03}
            variant="body2"
            style={styles.textTermsPolicy}
          >
            Terms and Conditions
          </Text>
          . Also consult our{" "}
          <Text
            color={colorsLight.GRAY_03}
            style={styles.textTermsPolicy}
            variant="body2"
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonNavigate: {
    marginBottom: 24,
  },
  textContainerTermsPolicy: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginVertical: 24,
    width: "80%",
    textAlign: "center",
  },
  textTermsPolicy: {
    textDecorationLine: "underline",
    fontFamily: "Satoshi-Black",
  },
});
