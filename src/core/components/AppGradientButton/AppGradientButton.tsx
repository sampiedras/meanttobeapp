import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";

interface AppGradientButtonProps {
  label: string | any;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  fontSize?: number;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const AppGradientButton = ({
  label,
  disabled,
  iconLeft,
  iconRight,
  fontSize = 16,
  height = 44,
  width = "100%",
  loading = false,
  style,
  onPress,
}: AppGradientButtonProps) => {
  const buttonColors = disabled
    ? ["#F1F3F4", "#F1F3F5"]
    : ["#4E6B51", "#7AA6A5"];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[{ height, width }, styles.container, style]}
    >
      <LinearGradient
        colors={buttonColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, { height }]}
      >
        {loading ? (
          <ActivityIndicator color="white" size={24} />
        ) : (
          <>
            {iconLeft}
            <Text
              style={[
                styles.text,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: iconLeft ? 4 : 0,
                  marginRight: iconRight ? 4 : 0,
                  fontSize,
                },
              ]}
              color={
                disabled ? colorsLight.DISABLED_TEXT_COLOR : colorsLight.WHITE
              }
            >
              {label}
            </Text>
            {iconRight}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
  },
  button: {
    flex: 1,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Satoshi-Medium",
  },
});
