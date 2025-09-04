import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import { useController } from "react-hook-form";
import { colorsLight } from "@/core/theme";

interface Props {
  control?: any;
  name: string;
  required?: boolean;
  label?: string;
  error: boolean;
  helperTextError?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoComplete?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  isDark?: boolean;
  onChange?: (text: string) => void;
  value?: string;
}

export const TextInputAnimatedDisabled = ({
  name,
  control,
  label,
  error,
  required,
  helperTextError = "",
  editable = true,
  containerStyle,
  keyboardType,
  autoCapitalize,
  autoComplete,
  multiline = false,
  onChange,
  value,
}: Props) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
    rules: {
      required,
    },
  });
  const [inputHeight, setHeight] = useState(0);
  const [placeholderWidth, setWidth] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 5],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 8],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, containerStyle]}
        onLayout={(e) => !inputHeight && setHeight(e.nativeEvent.layout.height)}
      >
        <View>
          <Animated.Text
            style={[
              styles.placeholder,
              { transform: [{ translateY }, { translateX }, { scale }] },
            ]}
            onTextLayout={(e) =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }
          >
            {label}
          </Animated.Text>
        </View>
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputArea,
            {
              color:
                editable === false
                  ? colorsLight.SECONDARY_TEXT_COLOR
                  : colorsLight.PRIMARY_TEXT_COLOR,
            },
          ]}
          autoComplete={autoComplete}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          onChangeText={onChange || field.onChange}
        />
      </View>
      {error && <Text style={styles.textError}>{helperTextError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    borderRadius: 16,
    width: "100%",
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    height: 75,
  },
  input: {
    marginTop: 18,
    paddingHorizontal: 14,
    fontSize: 16,
    height: 48,
    fontFamily: "Satoshi-Black",
  },
  inputArea: {
    height: 100,
    textAlignVertical: "top",
  },
  placeholder: {
    fontSize: 12,
    position: "absolute",
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontFamily: "Satoshi-Regular",
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    marginLeft: 16,
  },
});
