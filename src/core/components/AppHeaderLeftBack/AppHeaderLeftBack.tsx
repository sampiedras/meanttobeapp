import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";

interface IAppHeaderLeftBack {
  color?: string;
  onPress?: () => void;
  customIcon?: ReactNode;
  container?: ViewStyle;
}

export const AppHeaderLeftBack = ({
  color = colorsLight.CONTENT_PRIMARY,
  onPress,
  customIcon = <ArrowBackIcon width={44} height={44} color={color} />,
  container = styles.container,
}: IAppHeaderLeftBack) => {
  return (
    <TouchableOpacity
      center
      style={container}
      onPress={onPress}
      testID="header-back-button"
    >
      {customIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 12,
    paddingLeft: 2,
    paddingVertical: 12,
  },
});
