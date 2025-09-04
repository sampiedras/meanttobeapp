/* eslint-disable react-native/no-unused-styles */
import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";
import { colorsDark, colorsLight } from "@/core/theme";
import { fonts } from "@/core/theme/fonts";

export enum AppTextVariant {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  subtitle1 = "subtitle1",
  subtitle2 = "subtitle2",
  body1 = "body1",
  body2 = "body2",
  button = "button",
  caption = "caption",
  overline = "overline",
}

interface AppTextProps extends TextProps {
  variant: AppTextVariant;
  children: React.ReactNode;
  color?: string;
}

export const AppText = ({
  variant,
  children,
  style,
  color,
  ...props
}: AppTextProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const textColor = isDarkMode
    ? colorsDark.PRIMARY_TEXT_COLOR
    : colorsLight.PRIMARY_TEXT_COLOR;
  return (
    <Text
      style={[styles[variant], { color: color || textColor }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: fonts.BOLD,
    fontSize: 96,
    letterSpacing: -1.5,
  },
  h2: {
    fontFamily: fonts.MEDIUM,
    fontSize: 60,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: fonts.REGULAR,
    fontSize: 48,
  },
  h4: {
    fontFamily: fonts.REGULAR,
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: fonts.REGULAR,
    fontSize: 24,
  },
  h6: {
    fontFamily: fonts.MEDIUM,
    fontSize: 20,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontFamily: fonts.REGULAR,
    fontSize: 16,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: fonts.REGULAR,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    letterSpacing: 0.25,
  },
  button: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    letterSpacing: 1.25,
  },
  caption: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    letterSpacing: 1.5,
  },
});
