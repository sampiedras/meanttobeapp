import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";
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
