import React from "react";
import { I18n } from "aws-amplify/utils";
import { View } from "react-native-ui-lib";
import { AppText, AppTextVariant } from "../AppText";

export const AppShowEmptyList = () => {
  return (
    <View flex-1 center>
      <AppText variant={AppTextVariant.body1}>
        {I18n.get("app.show.empty.list")}
      </AppText>
    </View>
  );
};
