import React from "react";
import { StyleSheet, View } from "react-native";
import { BtnDiscardBlackIcon } from "@/explorer/assets/svg";

export const OverlayLeft = () => (
  <View style={styles.overlayLabelLeftContainer}>
    <BtnDiscardBlackIcon width={70} height={70} />
  </View>
);

const styles = StyleSheet.create({
  overlayLabelLeftContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    right: 40,
  },
});
