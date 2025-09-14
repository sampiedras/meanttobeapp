import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { CodeField, Cursor } from "react-native-confirmation-code-field";
import { AuthStackRoutes } from "@/auth/routes";
import { AppContainerSafeArea, AppGradientButton } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { CELL_COUNT, useConfirmViewModel } from "./confirmViewModel";

export const ConfirmScreen = ({
  route: { params },
}: RootStackScreenProps<AuthStackRoutes.CONFIRM>) => {
  const { type, username } = params;
  const {
    value,
    setValue,
    ref,
    props,
    loading,
    getCellOnLayoutHandler,
    handleSignInConfirmation,
    handleResendVerificationCode,
  } = useConfirmViewModel({
    username,
  });

  return (
    <AppContainerSafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}
      >
        <Text variant="h5" style={styles.title}>
          {type === "email" ? "Email verification" : "Phone verification"}
        </Text>
        <Text variant="body2" style={styles.subtitle}>
          We have sent you a code to your {type === "email" ? "email" : "phone"}
          : {"\n"}
          {username}
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View style={styles.marginT30}>
          <Text
            style={styles.textCodeReceive}
            variant="body2"
            color={colorsLight.SECONDARY_TEXT_COLOR}
          >
            Check your spam or junk mail folder for the verification code.
          </Text>
        </View>
        <View style={[styles.row, styles.marginT24]}>
          <Text
            style={styles.textCodeReceive}
            variant="body2"
            color={colorsLight.SECONDARY_TEXT_COLOR}
          >
            Didn’t receive the code?
          </Text>
          <TouchableOpacity onPress={handleResendVerificationCode}>
            <Text variant="body2" style={styles.textResend}>
              {" "}
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.marginH16}>
        <AppGradientButton
          label="Verify Account"
          loading={loading}
          disabled={value.length < 6}
          style={styles.button}
          onPress={handleSignInConfirmation}
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
  subtitle: {
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  textCodeReceive: {
    fontFamily: "Satoshi-Regular",
  },
  textResend: {
    color: colorsLight.PRIMARY_COLOR,
    fontFamily: "Satoshi-Black",
  },
  button: {
    marginBottom: 16,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    borderRadius: 8,
    fontSize: 24,
    textAlign: "center",
    backgroundColor: colorsLight.GRAY_LIGHT,
    fontFamily: "Satoshi-Medium",
  },
  focusCell: {
    borderColor: "#000",
  },
  row: { flexDirection: "row", alignItems: "center" },
  marginT24: { marginTop: 24 },
  marginT30: { marginTop: 30 },
  marginH16: { marginHorizontal: 16 },
});
