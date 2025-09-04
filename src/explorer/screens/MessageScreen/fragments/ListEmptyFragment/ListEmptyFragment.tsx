import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { NothingMessageIcon } from "@/explorer/assets/svg";

export const ListEmptyFragment = () => {
  return (
    <View flex-1 paddingT-32 center>
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
