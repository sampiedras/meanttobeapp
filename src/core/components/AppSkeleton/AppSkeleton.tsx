import React from "react";
import { Animated, DimensionValue, StyleProp, ViewStyle } from "react-native";
export enum AppSkeletonLoaderVariant {
  circle = "circle",
  square = "square",
  rectangle = "rectangle",
}

interface SkeletonProps {
  isDarkMode?: boolean;
  shape: AppSkeletonLoaderVariant;
  width: DimensionValue;
  height: DimensionValue;
  customStyle?: StyleProp<ViewStyle>;
  colors?: string[];
}

const ANIMATION_COLORS_LIGHT: string[] = ["#E0E0E0", "#F5F5F5"];
const ANIMATION_COLORS_DARK: string[] = ["#333333", "#444444"];

export const AppSkeleton = ({
  shape,
  width,
  height,
  customStyle,
  colors,
  isDarkMode = true,
}: SkeletonProps) => {
  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  const getStyles = () => {
    const backgroundColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: colors
        ? colors
        : isDarkMode
          ? ANIMATION_COLORS_DARK
          : ANIMATION_COLORS_LIGHT,
    });

    const style: {
      width: DimensionValue;
      height: DimensionValue;
      backgroundColor: Animated.AnimatedInterpolation<string | number>;
      borderRadius?: number;
    } = {
      width,
      height,
      backgroundColor,
    };

    switch (shape) {
      case AppSkeletonLoaderVariant.circle:
        if (typeof width === "number") {
          style.borderRadius = width / 2;
        }
        break;
      case AppSkeletonLoaderVariant.square:
        style.borderRadius = 5;
        break;
      case AppSkeletonLoaderVariant.rectangle:
      default:
        style.borderRadius = 10;
        break;
    }
    return style;
  };

  return (
    <Animated.View
      testID="skeleton-loader"
      style={[getStyles(), customStyle]}
    />
  );
};
