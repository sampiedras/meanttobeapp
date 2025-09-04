import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { PermissionNotificationIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

export const ViewPermissionTrackingFragment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This app uses tracking to enhance your experience. Can you allow
        tracking for personalized recommendations?
      </Text>
      <View flex-1 center>
        <PermissionNotificationIcon />
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
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
});
