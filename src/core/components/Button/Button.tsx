import React from "react";
import {
  AnimatableNumericValue,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";

interface Props {
  label: string;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  borderRadius?: AnimatableNumericValue | undefined;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Button = (props: Props) => {
  const {
    label,
    onPress,
    disabled,
    backgroundColor,
    textColor,
    height = 44,
    width = "100%",
    borderRadius = 24,
    iconLeft,
    iconRight,
    style,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height,
          width,
          backgroundColor: disabled ? "#F1F3F4" : backgroundColor,
          borderRadius: borderRadius,
        },
      ]}
    >
      {iconLeft}
      <Text
        color={disabled ? "#BABBBF" : textColor}
        style={[
          styles.text,
          // eslint-disable-next-line react-native/no-inline-styles
          { marginLeft: iconLeft ? 4 : 0, marginRight: iconRight ? 4 : 0 },
        ]}
      >
        {label}
      </Text>
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
