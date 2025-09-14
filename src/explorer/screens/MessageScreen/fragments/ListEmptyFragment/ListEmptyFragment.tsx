import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";
import { NothingMessageIcon } from "@/explorer/assets/svg";

export const ListEmptyFragment = () => {
  return (
    <View style={[styles.flex1, styles.paddingT32, styles.center]}>
      <NothingMessageIcon />
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.titleNothingHere}
        variant="h6"
      >
        Nothing here!
      </Text>
      <Text
        color={colorsLight.SECONDARY_TEXT_COLOR}
        style={styles.subtitleNothingHere}
        variant="body2"
      >
        Once you match with someone you’ll be able to start a conversation.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  paddingT32: { paddingTop: 32 },
  center: { alignItems: "center", justifyContent: "center" },
  titleNothingHere: {
    marginTop: 32,
    fontFamily: "Satoshi-Bold",
  },
  subtitleNothingHere: {
    textAlign: "center",
    marginTop: 15,
    fontFamily: "Satoshi-Regular",
  },
});
