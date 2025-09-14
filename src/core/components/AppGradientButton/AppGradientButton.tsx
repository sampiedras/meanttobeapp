import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import LinearGradient from "react-native-linear-gradient";
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
          <View style={styles.contentRow}>
            <View
              style={[
                styles.iconSlot,
                iconLeft ? styles.iconLeftPadding : null,
              ]}
            >
              {iconLeft}
            </View>
            <Text
              style={[styles.text, { fontSize }]}
              color={
                disabled ? colorsLight.DISABLED_TEXT_COLOR : colorsLight.WHITE
              }
            >
              {label}
            </Text>
            <View
              style={[
                styles.iconSlot,
                iconRight ? styles.iconRightPadding : null,
              ]}
            >
              {iconRight}
            </View>
          </View>
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
    paddingHorizontal: 16,
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSlot: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeftPadding: {
    paddingRight: 4,
  },
  iconRightPadding: {
    paddingLeft: 4,
  },
  text: {
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
});
