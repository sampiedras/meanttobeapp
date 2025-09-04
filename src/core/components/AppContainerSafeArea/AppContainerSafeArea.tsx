import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colorsLight } from "../../theme/colorsLight";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  style?: StyleProp<ViewStyle> | undefined;
  avoidKeyboard?: boolean;
  isDark?: boolean;
}

export const AppContainerSafeArea = ({
  children,
  bgColor,
  style,
  avoidKeyboard,
  isDark,
}: Props) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor:
            bgColor || isDark ? "black" : colorsLight.BACKGROUND_SCREEN_COLOR,
        },
      ]}
    >
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
          style={[
            style,
            styles.container,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor:
                bgColor || isDark
                  ? "black"
                  : colorsLight.BACKGROUND_SCREEN_COLOR,
            },
          ]}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
});
