import React from "react";
import { StyleSheet, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";

interface ICheckBoxFragmentProps {
  value: boolean;
  onChange: () => void;
  label: string;
}

export const CheckBoxFragment = ({
  value,
  onChange,
  label,
}: ICheckBoxFragmentProps) => {
  return (
    <View style={styles.rowSpreadCenterV}>
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.textsLookingFor}
      >
        {label}
      </Text>
      <CheckBox
        style={styles.checkBox}
        disabled={false}
        value={value}
        boxType="square"
        tintColors={{
          true: colorsLight.PRIMARY_COLOR,
          false: colorsLight.PRIMARY_COLOR,
        }}
        tintColor={colorsLight.PRIMARY_COLOR}
        onFillColor={colorsLight.PRIMARY_COLOR}
        onTintColor={colorsLight.PRIMARY_COLOR}
        onCheckColor={colorsLight.WHITE}
        onValueChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 20,
    height: 20,
  },
  rowSpreadCenterV: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textsLookingFor: {
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
});
