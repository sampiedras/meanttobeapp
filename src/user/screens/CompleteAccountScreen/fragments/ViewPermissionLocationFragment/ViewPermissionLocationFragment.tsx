import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { PermissionLocationIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

export const ViewPermissionLocationFragment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* In order to use the application we’ll need to gain access to your
        location. */}
        Would you like to share your location to personalize your experience?
      </Text>
      <View style={styles.centerFill}>
        <PermissionLocationIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
  },
  centerFill: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
});
