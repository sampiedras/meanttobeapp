import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";

export const CustomDateHeaderFragment = ({
  dateString,
}: {
  dateString?: string | number;
}) => {
  return (
    <View
      marginT-8
      paddingH-16
      paddingV-5
      backgroundColor={colorsLight.PRIMARY_COLOR}
      center
      style={styles.containerDateHeader}
    >
      <Text style={styles.textDateHeader} color={colorsLight.WHITE}>
        {dateString}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerDateHeader: {
    borderRadius: 100,
  },
  textDateHeader: {
    fontFamily: "Satoshi-Medium",
    fontSize: 12,
  },
});
