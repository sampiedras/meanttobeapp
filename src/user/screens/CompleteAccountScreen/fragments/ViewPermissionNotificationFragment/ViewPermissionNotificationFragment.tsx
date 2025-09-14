import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { PermissionNotificationIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

export const ViewPermissionNotificationFragment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enabling notifications allows us to give you a personalized experience
        and helps keep you informed of everything going on in
      </Text>
      <Text style={styles.titleMeantToBe}>Meant to Be.</Text>
      <View style={styles.centerFill}>
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
  centerFill: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  titleMeantToBe: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Black",
    fontSize: 16,
    textAlign: "center",
  },
});
