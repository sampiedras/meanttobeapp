import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { colorsDark, colorsLight } from "@/core/theme";

interface IAppContainer {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  avoidKeyboard?: boolean;
  paddingVertical?: number;
}

export const AppContainer = ({
  children,
  style,
  avoidKeyboard = false,
  paddingVertical = 8,
}: IAppContainer) => {
  const headerHeight = useHeaderHeight();
  const isDarkMode = false;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR,
        },
        style,
      ]}
      testID="app-container"
    >
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
          style={[style, styles.container, { paddingVertical }]}
          keyboardVerticalOffset={headerHeight}
          testID="keyboard-avoiding-view"
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
  },
});
