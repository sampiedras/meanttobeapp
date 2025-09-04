import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  DimensionValue,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { View } from "react-native-ui-lib";
import { colorsDark, colorsLight } from "@/core/theme";
import { AppText, AppTextVariant } from "../AppText";

export enum AppButtonVariant {
  contained = "contained",
  outlined = "outlined",
  text = "text",
}

export enum AppButtonSizeVariant {
  small = "small",
  medium = "medium",
  large = "large",
}

type AppButtonType = {
  variant: AppButtonVariant;
  size: AppButtonSizeVariant;
  isDark?: boolean;
  label?: string;
  labelColor?: string;
  bgColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isAutoWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  height?:
    | number
    | Animated.Value
    | "auto"
    | `${number}%`
    | undefined
    | DimensionValue;
  width?:
    | number
    | Animated.Value
    | "auto"
    | `${number}%`
    | undefined
    | DimensionValue;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  testID?: string;
};

const appButtonSize: { [key: string]: number } = {
  small: 32,
  medium: 40,
  large: 48,
};

const appTextSize: { [key in AppButtonSizeVariant]: AppTextVariant } = {
  small: AppTextVariant.body2,
  medium: AppTextVariant.body1,
  large: AppTextVariant.subtitle1,
};

export const AppButton = ({
  label = "",
  labelColor,
  bgColor = "",
  variant,
  iconLeft,
  iconRight,
  style,
  size,
  isAutoWidth,
  width,
  isLoading,
  disabled,
  onPress,
  testID = "app-button",
}: AppButtonType) => {
  const [pressAnim] = useState(new Animated.Value(1));
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const isDarkMode = useColorScheme() === "dark";

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(pressAnim, {
        toValue: 0.95,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(opacityAnim, {
        toValue: 0.7,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(pressAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(opacityAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const textSizeVariant = appTextSize[size];
  const getButtonColors = () => {
    if (disabled) {
      return {
        backgroundColor: isDarkMode
          ? variant === AppButtonVariant.contained
            ? colorsDark.BUTTON_DISABLED_COLOR
            : colorsDark.BACKGROUND_BUTTON_COLOR
          : variant === AppButtonVariant.contained
            ? colorsLight.BUTTON_DISABLED_COLOR
            : colorsLight.BACKGROUND_BUTTON_COLOR,

        borderColor: colorsLight.GRAY_04,
        textColor: isDarkMode
          ? colorsDark.BUTTON_DISABLED_TEXT_COLOR
          : colorsLight.BUTTON_DISABLED_TEXT_COLOR,
      };
    }

    switch (variant) {
      case AppButtonVariant.contained:
        return {
          backgroundColor:
            bgColor ||
            (isDarkMode ? colorsDark.PRIMARY_COLOR : colorsLight.PRIMARY_COLOR),
          borderColor: "transparent",
          textColor: isDarkMode
            ? colorsDark.BUTTON_TEXT_CONTAINED_COLOR
            : colorsLight.BUTTON_TEXT_CONTAINED_COLOR,
        };
      case AppButtonVariant.outlined:
        return {
          backgroundColor: "transparent",
          borderColor: isDarkMode
            ? colorsDark.BUTTON_BORDER_COLOR
            : colorsLight.BUTTON_BORDER_COLOR,
          textColor: isDarkMode
            ? colorsDark.BUTTON_TEXT_OUTLINED_COLOR
            : colorsLight.BUTTON_TEXT_OUTLINED_COLOR,
        };
      case AppButtonVariant.text:
        return {
          backgroundColor: isDarkMode
            ? colorsDark.BACKGROUND_BUTTON_COLOR
            : colorsLight.BACKGROUND_BUTTON_COLOR,
          borderColor: "transparent",
          textColor: isDarkMode
            ? colorsDark.BUTTON_TEXT_COLOR
            : colorsLight.BUTTON_TEXT_COLOR,
        };
      default:
        return {
          backgroundColor: isDarkMode
            ? colorsDark.BACKGROUND_BUTTON_COLOR
            : colorsLight.BACKGROUND_BUTTON_COLOR,
          borderColor: "transparent",
          textColor: isDarkMode
            ? colorsDark.BUTTON_TEXT_OUTLINED_COLOR
            : colorsLight.BUTTON_TEXT_OUTLINED_COLOR,
        };
    }
  };

  const { backgroundColor, borderColor, textColor } = getButtonColors();

  const animatedStyle = {
    transform: [{ scale: pressAnim }],
    opacity: opacityAnim,
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <View width={24} height={24} center>
      {children}
    </View>
  );

  const colorsGradient = isDarkMode
    ? ["#67b7ed", "#4981dd"]
    : ["#67b7ed", "#4981dd"];

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,

        animatedStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderColor: borderColor,
          borderWidth: variant === AppButtonVariant.outlined ? 1 : 0,
          minHeight: appButtonSize[size],
          width: isAutoWidth ? "auto" : width || "100%",
        },
        style,
      ]}
    >
      <LinearGradient
        colors={
          variant === AppButtonVariant.contained && !disabled
            ? colorsGradient
            : [backgroundColor, backgroundColor]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.btnGradient}
      >
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.btn}
          onPress={onPress}
          disabled={disabled}
        >
          {isLoading ? (
            <ActivityIndicator color={textColor} size={30} />
          ) : (
            <>
              <IconWrapper>{iconLeft}</IconWrapper>
              <AppText
                variant={textSizeVariant}
                color={labelColor || textColor}
                style={styles.title}
              >
                {label}
              </AppText>
              <IconWrapper>{iconRight}</IconWrapper>
            </>
          )}
        </Pressable>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 24,
  },
  title: {
    marginHorizontal: 8,
  },
  btnGradient: {
    borderRadius: 24,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  btn: {
    borderRadius: 24,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
