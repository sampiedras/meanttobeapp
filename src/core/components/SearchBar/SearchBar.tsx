import React from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { View } from "react-native-ui-lib";
import { SearchIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  style?: StyleProp<ViewStyle>;
}

export const SearchBar = ({
  placeholder,
  onChangeText,
  value,
  style,
}: Props) => {
  return (
    <View
      row
      centerV
      paddingH-16
      width="100%"
      height={42}
      style={[styles.containerInput, style]}
    >
      <SearchIcon width={18} height={18} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={colorsLight.GRAY_03}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    borderColor: colorsLight.GRAY_02,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
  },
  input: {
    width: "95%",
    color: colorsLight.GRAY_03,
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
  },
});
