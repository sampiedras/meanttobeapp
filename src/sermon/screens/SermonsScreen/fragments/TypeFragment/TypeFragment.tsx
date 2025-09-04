import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";

interface Props {
  name: string;
  isActive?: boolean;
  item: string | number;
  handleSelect: (item: string | string) => void;
}

export const TypeFragment = ({ name, isActive, item, handleSelect }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(item.toString())}
      marginR-4
      style={[
        {
          backgroundColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_LIGHT,
        },
        styles.container,
      ]}
    >
      <Text
        lineBreakStrategyIOS="standard"
        numberOfLines={1}
        color={isActive ? colorsLight.WHITE : colorsLight.SECONDARY_TEXT_COLOR}
        style={styles.text}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
  text: {
    fontFamily: "Satoshi-Medium",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
