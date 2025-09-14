import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { I18n } from "aws-amplify/utils";
import { useController } from "react-hook-form";
import { CrossFilledIcon, InfoIconOutlined } from "@/core/assets/svg";
import { colorsDark, colorsLight } from "@/core/theme";
import { AppText, AppTextVariant } from "../AppText";

export enum TextInputType {
  FLOAT = "FLOAT",
  OUTLINE = "OUTLINE",
}

export enum TextInputState {
  BLUR = "blur",
  FOCUS = "focus",
}

interface TextInputAnimatedProps {
  control?: any;
  name: string;
  required?: boolean;
  label?: string;
  error?: boolean;
  textError?: string;
  helperText?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoComplete?: TextInputProps["autoComplete"];
  keyboardType?: KeyboardTypeOptions | undefined;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  isDark?: boolean;
  secureTextEntry?: boolean;
  onChange?: (text: string) => void;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  maxLength?: number;
  value?: string;
  type?: TextInputType;
  placeholder?: string;
  setOnFocus?: () => void;
  setOnBlur?: () => void;
  onMessage?: (
    message: (typeof TextInputState)[keyof typeof TextInputState],
  ) => void;
  testID?: string;
}

export enum inputBorderWidth {
  isFocus = 2,
  isNotFocus = 1,
}

export enum inputBorderRadius {
  float = 5,
  outline = 10,
}

export const AppTextInputAnimated = ({
  name,
  control,
  label,
  error = false,
  required,
  textError = I18n.get("form.error.label"),
  editable = true,
  containerStyle,
  keyboardType,
  autoCapitalize,
  autoComplete,
  multiline = false,
  secureTextEntry = false,
  onChange,
  rightIcon,
  leftIcon,
  onMessage,
  maxLength,
  value,
  type = TextInputType.OUTLINE,
  placeholder,
  setOnFocus,
  setOnBlur,
  testID = "app-text-input",
}: TextInputAnimatedProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const { field } = useController({
    control,
    defaultValue: "",
    name,
    rules: {
      required,
    },
  });
  const inputValue = value ?? field.value;
  const [inputHeight, setHeight] = useState(0);
  const [labelWidth, setWidth] = useState(0);
  const [labelBackground, setLabelBackground] = useState<string>("transparent");
  const animation = useRef(new Animated.Value(0)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / (type === TextInputType.FLOAT ? 2 : 5)],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -labelWidth / 8],
  });
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const [isFocus, setFocus] = useState<boolean>(false);

  const onFocus = () => {
    animate(1);
    setLabelBackground(
      isDarkMode
        ? colorsDark.BACKGROUND_SCREEN_COLOR
        : colorsLight.BACKGROUND_SCREEN_COLOR,
    );
    setFocus(true);
    onMessage && onMessage(TextInputState.FOCUS);
    if (setOnFocus) {
      setOnFocus();
    }
  };
  const onBlur = () => {
    if (!inputValue && !placeholder) {
      animate(0);
      setLabelBackground("transparent");
    }
    setFocus(false);
    onMessage && onMessage(TextInputState.BLUR);
    if (setOnBlur) {
      setOnBlur();
    }
  };
  const animate = (val: number) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (inputValue) {
      onFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    if (placeholder) {
      animate(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder]);

  return (
    <View style={styles.container} testID={testID}>
      <View
        style={[
          styles.inputContainer,
          containerStyle,
          styles.paddingH14,
          {
            borderColor: isFocus
              ? colorsLight.PRIMARY_COLOR
              : isDarkMode
                ? colorsLight.BACKGROUND_SCREEN_COLOR
                : colorsDark.BACKGROUND_SCREEN_COLOR,
            borderWidth: isFocus
              ? inputBorderWidth.isFocus
              : inputBorderWidth.isNotFocus,
            borderRadius:
              type === TextInputType.OUTLINE
                ? inputBorderRadius.outline
                : inputBorderRadius.float,
          },
          type === TextInputType.OUTLINE && {
            backgroundColor: isDarkMode
              ? colorsDark.BACKGROUND_SCREEN_COLOR
              : colorsLight.BACKGROUND_SCREEN_COLOR,
          },
          error && { borderColor: colorsLight.ERROR_COLOR },
        ]}
        onLayout={(e: any) =>
          !inputHeight && setHeight(e.nativeEvent.layout.height)
        }
      >
        <View style={[{ height: inputHeight }, styles.labelContainer]}>
          <Animated.Text
            style={[
              styles.label,
              isDarkMode ? styles.labelDark : styles.labelLight,
              { transform: [{ translateY }, { translateX }, { scale }] },
              { backgroundColor: labelBackground },
              {
                color: isFocus
                  ? colorsLight.PRIMARY_COLOR
                  : isDarkMode
                    ? colorsDark.BUTTON_TEXT_COLOR
                    : colorsLight.BUTTON_TEXT_COLOR,
              },
              error && { color: colorsLight.ERROR_COLOR },
            ]}
            onTextLayout={(e) =>
              !labelWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }
          >
            {label}
          </Animated.Text>
        </View>
        <View style={styles.iconStyles}>
          {leftIcon ?? null}
          <TextInput
            testID="app-text-input"
            style={[
              styles.input,
              type === TextInputType.FLOAT
                ? styles.floatInput
                : styles.outlineInput,
              isDarkMode ? styles.inputDark : styles.inputLight,
              multiline && styles.inputArea,
            ]}
            autoComplete={autoComplete}
            value={inputValue}
            editable={editable}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChangeText={onChange || field.onChange}
            maxLength={maxLength}
            caretHidden={false}
          />
          {rightIcon ?? null}
          {editable && field.value && isFocus && (
            <Pressable
              style={styles.closeIcon}
              onPress={(e) => {
                e.stopPropagation();
                onChange || field.onChange("");
              }}
            >
              <CrossFilledIcon
                color={
                  isDarkMode
                    ? colorsDark.PRIMARY_COLOR
                    : colorsLight.PRIMARY_COLOR
                }
              />
            </Pressable>
          )}
        </View>
      </View>
      {error && (
        <>
          <View
            style={[
              styles.errorContainer,
              styles.rowCenter,
              styles.marginT4,
              styles.paddingH16,
            ]}
          >
            <InfoIconOutlined
              color={
                isDarkMode ? colorsDark.ERROR_COLOR : colorsLight.ERROR_COLOR
              }
              width={12}
              height={12}
            />
            <AppText
              variant={AppTextVariant.body1}
              color={
                isDarkMode ? colorsDark.ERROR_COLOR : colorsLight.ERROR_COLOR
              }
            >
              {textError ?? ""}
            </AppText>
          </View>
        </>
      )}
      {/** helperText */}
      {/** we removed helperText block for brevity; re-add if used */}
      {maxLength && !error && (
        <AppText
          variant={AppTextVariant.body1}
          style={isDarkMode ? styles.maxLengthDark : styles.maxLengthLight}
        >
          {inputValue.length}/{maxLength}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    borderColor: colorsLight.OUTLINE,
    borderWidth: inputBorderWidth.isNotFocus,
    width: "100%",
  },
  input: {
    flex: 1,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  floatInput: {
    fontSize: 18,
    height: 48,
  },
  outlineInput: {
    marginTop: 2,
    marginBottom: -8,
    fontSize: 16,
    height: 64,
  },
  inputDark: {
    color: colorsDark.CONTENT_PRIMARY,
  },
  inputLight: {
    color: colorsLight.CONTENT_SECONDARY,
  },
  inputArea: {
    height: 100,
    textAlignVertical: "top",
  },
  labelContainer: {
    position: "absolute",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    position: "absolute",
    fontFamily: "Poppins",
    marginLeft: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  labelDark: {
    color: colorsDark.CONTENT_SECONDARY,
  },
  labelLight: {
    color: colorsLight.CONTENT_SECONDARY,
  },
  maxLengthDark: {
    color: colorsDark.CONTENT_SECONDARY,
    marginTop: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  maxLengthLight: {
    color: colorsLight.CONTENT_SECONDARY,
    marginTop: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 16,
  },
  helpText: {
    color: colorsLight.CONTENT_SECONDARY,
  },
  iconStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeIcon: {
    marginLeft: 8,
  },
  errorContainer: {
    gap: 8,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  marginT4: {
    marginTop: 4,
  },
  paddingH14: {
    paddingHorizontal: 14,
  },
  paddingH16: {
    paddingHorizontal: 16,
  },
});
