import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { RadioButtonCheckIcon, RadioButtonIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { SearchingEntityResponse } from "@/user/data/remote/entities/searchingEntity";

export const RenderItemFragment = ({
  item,
  handleSelect,
}: {
  item: SearchingEntityResponse;
  handleSelect: (item: SearchingEntityResponse) => () => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.rowCenterV,
        styles.radioButton,
        {
          borderColor: item.selected
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_02,
        },
      ]}
      onPress={handleSelect(item)}
    >
      <Text variant="body1" style={styles.textRadio}>
        {item.name}
      </Text>
      {item.selected ? <RadioButtonCheckIcon /> : <RadioButtonIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    backgroundColor: "white",
    width: "100%",
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  textRadio: {
    fontFamily: "Satoshi-Black",
  },
});
