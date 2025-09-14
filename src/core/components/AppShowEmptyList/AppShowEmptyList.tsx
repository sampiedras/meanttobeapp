import React from "react";
import { StyleSheet, View } from "react-native";
import { I18n } from "aws-amplify/utils";
import { AppText, AppTextVariant } from "../AppText";

export const AppShowEmptyList = () => {
  return (
    <View style={styles.container}>
      <AppText variant={AppTextVariant.body1}>
        {I18n.get("app.show.empty.list")}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
