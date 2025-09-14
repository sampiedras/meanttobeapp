import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "@react-native-material/core";
import { SearchIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface Props {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const SearchBarButton = ({ placeholder, style, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={[styles.containerInput, styles.rowCenter, style]}>
        <SearchIcon />
        <Text color={colorsLight.GRAY_03} variant="body1" style={styles.input}>
          {placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  containerInput: {
    borderColor: colorsLight.GRAY_02,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
    paddingHorizontal: 16,
    height: 42,
    width: "100%",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontFamily: "Satoshi-Regular",
  },
});
