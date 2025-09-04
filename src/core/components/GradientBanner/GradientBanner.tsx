import React from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  ViewProps,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colorsLight } from "@/core/theme";
import { Button } from "../Button";

interface Props {
  title: string;
  text?: string;
  labelButton: string;
  style?: StyleProp<ViewProps>;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  onPress?: () => void;
}

export const GradientBanner = (props: Props) => {
  const {
    title,
    text,
    labelButton,
    onPress,
    style,
    width,
    height = 28,
  } = props;
  return (
    <LinearGradient
      colors={["#7C5EBC", "#9EA0D1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ height }, style, styles.container]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Button
        label={labelButton}
        backgroundColor={colorsLight.WHITE}
        width={width}
        height={height}
        onPress={onPress}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 136,
    borderRadius: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    color: colorsLight.WHITE,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Satoshi-Black",
  },
  text: {
    color: colorsLight.WHITE,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
    width: "70%",
  },
});
