import React, { useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { colorsDark, colorsLight } from "@/core/theme";

interface Progress {
  position: number;
  offset: number;
}

interface AppViewPagerProgressBarProps extends ViewProps {
  progress: Progress;
  numberOfPages: number;
}

export const AppViewPagerProgressBar = ({
  progress,
  numberOfPages,
  style,
  ...rest
}: AppViewPagerProgressBarProps) => {
  const isDarkMode = useColorScheme() === "dark";

  const clampedSize = useMemo(() => {
    const fractionalPosition = progress.position + progress.offset;
    const size = fractionalPosition / (numberOfPages - 1);
    return Math.max(0, Math.min(1, size));
  }, [progress, numberOfPages]);

  return (
    <View
      accessibilityValue={{
        min: 0,
        max: 100,
        now: clampedSize * 100,
      }}
      style={[styles.progressBarContainer, style] as StyleProp<ViewStyle>}
      {...rest}
    >
      <View
        style={[
          styles.progressBar,
          {
            width: `${clampedSize * 100}%`,
            backgroundColor: isDarkMode
              ? colorsLight.BACKGROUND_SCREEN_COLOR
              : colorsDark.BACKGROUND_SCREEN_COLOR,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    borderRadius: 10,
    justifyContent: "center",
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 10,
  },
});
