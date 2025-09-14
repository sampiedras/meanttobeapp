import React from "react";
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";

interface Props {
  title?: string | number;
  backgroundColor?: string;
  colorTitle?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconCenter?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  fontSize?: number | undefined;
  fontFamily?: string | undefined;
}

export const Tag = (props: Props) => {
  const {
    title,
    backgroundColor,
    colorTitle,
    iconLeft,
    iconRight,
    iconCenter,
    style,
    width,
    height = 32,
    fontSize = 16,
    fontFamily = "Satoshi-Regular",
  } = props;

  return (
    <View style={[{ backgroundColor, width, height }, style, styles.container]}>
      {iconLeft}
      <Text color={colorTitle} style={[{ fontSize, fontFamily }, styles.title]}>
        {iconCenter && iconCenter}
        {title}
      </Text>
      {iconRight}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 200,
  },
  title: {
    textAlign: "center",
  },
});
