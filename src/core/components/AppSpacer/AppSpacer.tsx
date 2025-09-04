import React from "react";
import { DimensionValue, View } from "react-native";

interface IAppSpacer {
  height?: DimensionValue | undefined;
}

export const AppSpacer = ({ height = 16 }: IAppSpacer) => (
  <View testID="app-spacer" style={{ height }} />
);
