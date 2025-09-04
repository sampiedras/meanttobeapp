import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { SearchIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface Props {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const SearchBarButton = ({ placeholder, style, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        row
        centerV
        paddingH-16
        width="100%"
        height={42}
        style={[styles.containerInput, style]}
      >
        <SearchIcon />
        <Text color={colorsLight.GRAY_03} variant="body1" style={styles.input}>
          {placeholder}
        </Text>
      </View>
    </TouchableOpacity>
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
    fontFamily: "Satoshi-Regular",
  },
});
