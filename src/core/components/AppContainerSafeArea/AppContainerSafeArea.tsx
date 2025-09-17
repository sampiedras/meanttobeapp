import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { colorsLight } from "../../theme/colorsLight";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  style?: StyleProp<ViewStyle> | undefined;
  avoidKeyboard?: boolean;
  isDark?: boolean;
  edges?: Edge[];
}

export const AppContainerSafeArea = ({
  children,
  bgColor,
  style,
  avoidKeyboard,
  isDark,
  edges = ["top", "bottom"],
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
      edges={edges}
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
