import React, { useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { colorsDark, colorsLight } from "@/core/theme";
import { AppText, AppTextVariant } from "../AppText";

export enum AppButtonIconVariant {
  contained = "contained",
  outlined = "outlined",
  text = "text",
}

export enum AppButtonIconSizeVariant {
  small = "small",
  medium = "medium",
  large = "large",
}

const appTextSize: { [key in AppButtonIconSizeVariant]: AppTextVariant } = {
  small: AppTextVariant.body2,
  medium: AppTextVariant.body1,
  large: AppTextVariant.subtitle1,
};

type AppButtonType = {
  label?: string;
  variant: AppButtonIconVariant;
  size: AppButtonIconSizeVariant;
  bgColor?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  testID?: string;
  height?: number;
  width?: number;
};

const appButtonSize: { [key: string]: number } = {
  small: 48,
  medium: 56,
  large: 64,
};

export const AppButtonIcon = ({
  label,
  icon,
  style,
  size,
  disabled,
  onPress,
  height,
  width,
  testID = "app-button-icon",
  bgColor,
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

  const animatedStyle = {
    transform: [{ scale: pressAnim }],
    opacity: opacityAnim,
  };

  const textSizeVariant = appTextSize[size];

  return (
    <Animated.View
      testID={testID}
      style={[
        animatedStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: height || appButtonSize[size],
          width: width || label ? "auto" : appButtonSize[size],
        },
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={() => [
          styles.btn,
          {
            backgroundColor: isDarkMode
              ? bgColor || colorsDark.BACKGROUND_SCREEN_COLOR
              : bgColor || colorsLight.BACKGROUND_SCREEN_COLOR,
            borderRadius: appButtonSize[size] / 3,
          },
        ]}
      >
        {icon}
        {label && (
          <AppText
            variant={textSizeVariant}
            color={
              isDarkMode
                ? colorsDark.PRIMARY_TEXT_COLOR
                : colorsLight.PRIMARY_TEXT_COLOR
            }
            style={styles.text}
          >
            {label}
          </AppText>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  text: {
    marginLeft: 4,
  },
});
