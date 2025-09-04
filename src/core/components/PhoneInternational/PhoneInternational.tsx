import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { I18n } from "aws-amplify/utils";
import { CountryPicker } from "react-native-country-codes-picker";
import { View } from "react-native-ui-lib";
import { colorsDark, colorsLight } from "@/core/theme";
import { fonts } from "@/core/theme/fonts";
import { AppText, AppTextVariant } from "../AppText";
import { TextInputType } from "../AppTextInputAnimated/AppTextInputAnimated";
import { InputPhone } from "./InputPhone";
import { ICountryCodes, MdkPhoneInternationalProps } from "./interfaces";

export const PhoneInternational = ({
  outputPhoneNumber,
  initialCountryCode,
  setCountryCode,
  initialPhoneNumber,
  phoneLabel,
  type = TextInputType.OUTLINE,
}: MdkPhoneInternationalProps) => {
  const isDarkMode = useColorScheme() === "dark";

  const [countrySelected, setCountrySelected] = useState<ICountryCodes>(
    initialCountryCode ?? {
      code: "CO",
      dial_code: "+57",
      name: "Colombia",
    },
  );

  useEffect(() => {
    if (setCountryCode) {
      setCountryCode({
        code: "CO",
        dial_code: "+57",
        name: "Colombia",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const outputPhoneNumberMdkInputPhone = (phone: string) => {
    outputPhoneNumber?.(phone);
  };

  return (
    <View style={styles.container} testID="phone-number-input">
      <View style={styles.countryCode}>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={[
            styles.countryCodeTouchable,
            type === TextInputType.OUTLINE && styles.countryCodeOutline,
            {
              backgroundColor: isDarkMode
                ? colorsDark.BACKGROUND_SCREEN_COLOR
                : colorsLight.BACKGROUND_SCREEN_COLOR,
            },
          ]}
        >
          <AppText
            variant={AppTextVariant.body1}
            color={
              isDarkMode
                ? colorsDark.BUTTON_TEXT_COLOR
                : colorsLight.BUTTON_TEXT_COLOR
            }
          >
            {`${countrySelected.dial_code} (${countrySelected.code})`}
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.phone}>
        <InputPhone
          placeHolder={phoneLabel ?? I18n.get("signIn.label.phone")}
          initialPhoneNumber={initialPhoneNumber}
          phoneCountry={countrySelected}
          outputPhoneNumber={outputPhoneNumberMdkInputPhone}
          placeHolderStyle={colorsLight.ON_BACKGROUND}
          isDark={false}
          type={type}
        />
      </View>
      <CountryPicker
        lang="en"
        show={showPicker}
        onBackdropPress={() => setShowPicker(false)}
        style={{
          modal: styles.modal,
          line: styles.line,
          textInput: styles.textInput,
          countryName: styles.countryName as ViewStyle,
          dialCode: styles.dialCode as ViewStyle,
          countryButtonStyles: styles.countryButtonStyles,
        }}
        pickerButtonOnPress={(item) => {
          const countryCodeValue = {
            name: item.name.en,
            dial_code: item.dial_code,
            code: item.code,
          };
          setCountrySelected(countryCodeValue);
          if (setCountryCode) {
            setCountryCode(countryCodeValue);
          }
          setShowPicker(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  phone: { width: "65%" },
  countryCode: {
    width: "35%",
  },
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  countryCodeTouchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colorsLight.OUTLINE,
  },
  countryCodeOutline: {
    height: 64,
    borderRadius: 10,
  },
  modal: {
    height: "80%",
    backgroundColor: colorsLight.BACKGROUND,
  },
  line: {
    backgroundColor: colorsLight.ON_BACKGROUND,
  },
  textInput: {
    backgroundColor: colorsLight.BACKGROUND,
    fontFamily: fonts.MEDIUM,
  },
  countryName: {
    fontFamily: fonts.MEDIUM,
    color: colorsLight.ON_BACKGROUND,
  },
  dialCode: {
    fontFamily: fonts.MEDIUM,
    color: colorsLight.ON_BACKGROUND,
  },
  countryButtonStyles: {
    backgroundColor: colorsLight.BACKGROUND,
  },
});
