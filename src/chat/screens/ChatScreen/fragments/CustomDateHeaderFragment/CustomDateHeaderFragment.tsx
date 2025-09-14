import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";

export const CustomDateHeaderFragment = ({
  dateString,
}: {
  dateString?: string | number;
}) => {
  return (
    <View
      style={[
        styles.containerDateHeader,
        styles.marginT8,
        styles.paddingH16,
        styles.paddingV5,
        styles.center,
        { backgroundColor: colorsLight.PRIMARY_COLOR },
      ]}
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
  center: { justifyContent: "center", alignItems: "center" },
  marginT8: { marginTop: 8 },
  paddingH16: { paddingHorizontal: 16 },
  paddingV5: { paddingVertical: 5 },
  textDateHeader: {
    fontFamily: "Satoshi-Medium",
    fontSize: 12,
  },
});
