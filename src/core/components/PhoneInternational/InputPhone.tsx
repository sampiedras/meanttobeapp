import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { I18n } from "aws-amplify/utils";
import { phone as E164Phones } from "phone";
import { View } from "react-native-ui-lib";
import { CrossFilledIcon, InfoIconOutlined } from "@/core/assets/svg";
import { colorsDark, colorsLight } from "@/core/theme";
import { fonts } from "@/core/theme/fonts";
import { APP_ENV, EEnvironment } from "@/core/utils/config";
import { AppText, AppTextVariant } from "../AppText";
import {
  inputBorderRadius,
  inputBorderWidth,
  TextInputType,
} from "../AppTextInputAnimated/AppTextInputAnimated";
import { ICountryCodes } from "./interfaces";

interface PhoneCountry {
  phoneCountry: ICountryCodes;
  outputPhoneNumber: (phoneNumber: string) => void;
  style?: any;
  placeHolder: string;
  placeHolderStyle?: any;
  invalidStyles?: any;
  initialPhoneNumber?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isDark?: boolean;
  type?: TextInputType;
}

export const InputPhone: React.FC<PhoneCountry> = ({
  phoneCountry,
  outputPhoneNumber,
  placeHolder,
  containerStyle,
  // initialPhoneNumber = __DEV__ ? '' : '',
  initialPhoneNumber = __DEV__ ? "3194757378" : "",
  type,
}) => {
  const isDarkMode = useColorScheme() === "dark";
  const animation = useRef(
    new Animated.Value(initialPhoneNumber ? 1 : 0),
  ).current;
  const [inputHeight, setHeight] = useState(0);
  const [placeholderWidth, setWidth] = useState(0);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialPhoneNumber ?? "",
  );

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / (type === TextInputType.FLOAT ? 2 : 5)],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 8],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const [isFocus, setFocus] = useState<boolean>(false);
  const onFocus = () => {
    animate(1);
    setFocus(true);
  };
  const onBlur = () => {
    !phoneNumber && animate(0);
    setFocus(false);
  };
  const animate = (val: number) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const validateE164 = (number: string): void => {
    number ? setIsEmpty(false) : setIsEmpty(true);

    const finalNumber: string = `${phoneCountry.dial_code}${number}`;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const isValid: boolean =
      APP_ENV !== EEnvironment.PRODUCTION && number === "112224444"
        ? true
        : E164Phones(finalNumber, {
            country: phoneCountry.code,
          }).isValid;

    setIsValid(isValid);
    outputPhoneNumber(isValid ? finalNumber : "");
  };

  useEffect(() => {
    if (phoneCountry.dial_code && phoneNumber) {
      validateE164(phoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneCountry]);

  return (
    <View>
      <View
        paddingH-13
        style={[
          styles.inputContainer,
          containerStyle,
          {
            backgroundColor: isDarkMode
              ? colorsDark.BACKGROUND_SCREEN_COLOR
              : colorsLight.BACKGROUND_SCREEN_COLOR,
            borderColor: isFocus
              ? colorsLight.PRIMARY_COLOR
              : isDarkMode
                ? colorsLight.BACKGROUND_SCREEN_COLOR
                : colorsDark.BACKGROUND_SCREEN_COLOR,
            borderWidth: isFocus
              ? inputBorderWidth.isFocus
              : inputBorderWidth.isNotFocus,
            borderRadius:
              type === TextInputType.OUTLINE
                ? inputBorderRadius.outline
                : inputBorderRadius.float,
          },
          !isValid && !isEmpty && { borderColor: colorsLight.ERROR_COLOR },
        ]}
        onLayout={(e) => !inputHeight && setHeight(e.nativeEvent.layout.height)}
      >
        <View style={{ height: inputHeight, ...styles.labelContainer }}>
          <Animated.Text
            style={[
              styles.label,
              isDarkMode ? styles.labelDark : styles.labelLight,
              { transform: [{ translateY }, { translateX }, { scale }] },
              {
                color: isFocus
                  ? colorsLight.PRIMARY_COLOR
                  : isDarkMode
                    ? colorsDark.BUTTON_TEXT_COLOR
                    : colorsLight.BUTTON_TEXT_COLOR,
                backgroundColor: isDarkMode
                  ? colorsDark.BACKGROUND_SCREEN_COLOR
                  : colorsLight.BACKGROUND_SCREEN_COLOR,
              },
              !isValid && !isEmpty && { color: colorsLight.ERROR_COLOR },
            ]}
            onTextLayout={(e) =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }
          >
            {placeHolder}
          </Animated.Text>
        </View>
        <View style={styles.iconStyles}>
          <TextInput
            value={phoneNumber}
            style={[
              styles.input,
              type === TextInputType.FLOAT
                ? styles.floatInput
                : styles.outlineInput,
              isDarkMode ? styles.inputDark : styles.inputLight,
            ]}
            keyboardType="numeric"
            onBlur={onBlur}
            onFocus={onFocus}
            onChangeText={(number) => {
              validateE164(number);
              setPhoneNumber(number);
            }}
            maxLength={10}
          />
          {phoneNumber && isFocus && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                validateE164("");
                setPhoneNumber("");
              }}
            >
              <CrossFilledIcon
                color={
                  isDarkMode
                    ? colorsLight.CONTENT_SECONDARY
                    : colorsDark.CONTENT_SECONDARY
                }
              />
            </Pressable>
          )}
        </View>
      </View>
      {!isValid && !isEmpty && (
        <>
          <View row marginT-4 paddingH-16 style={styles.errorContainer}>
            <InfoIconOutlined
              fill={colorsLight.ERROR_COLOR}
              width={16}
              height={16}
            />
            <AppText variant={AppTextVariant.body1} style={styles.textError}>
              {I18n.get("signIn.phone.required")}
            </AppText>
          </View>
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  iconStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colorsLight.OUTLINE,
    width: "100%",
  },
  input: {
    flex: 1,
  },
  inputDark: {
    color: colorsDark.CONTENT_PRIMARY,
  },
  inputLight: {
    color: colorsLight.CONTENT_PRIMARY,
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: colorsLight.SENTIMENT_NEGATIVE_COLOR,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontFamily: fonts.MEDIUM,
    position: "absolute",
    marginLeft: 16,
  },
  labelDark: {
    backgroundColor: colorsDark.BACKGROUND,
    color: colorsDark.CONTENT_PRIMARY,
  },
  labelLight: {
    backgroundColor: colorsLight.SURFACE_1,
    color: colorsLight.CONTENT_PRIMARY,
  },
  textError: {
    flex: 1,
    color: colorsLight.ERROR_COLOR,
  },
  floatInput: {
    fontSize: 18,
    height: 48,
  },
  outlineInput: {
    marginTop: 10,
    marginBottom: -11,
    fontSize: 16,
    height: 64,
  },
  errorContainer: {
    gap: 8,
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
});
