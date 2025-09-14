import React from "react";
import { StyleSheet, View } from "react-native";
import { BtnYesIcon } from "@/explorer/assets/svg";

export const OverlayRight = () => (
  <View style={styles.overlayLabelRightContainer}>
    <BtnYesIcon width={70} height={70} />
  </View>
);

const styles = StyleSheet.create({
  overlayLabelRightContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 40,
    left: 10,
  },
});
