import {
  View,
  DimensionValue,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';

interface Props {
  icon: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const CircleButton = (props: Props) => {
  const {
    icon,
    backgroundColor,
    width = 52,
    height = 52,
    style,
    onPress,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        styles.container,
        {
          width,
          height,
          backgroundColor: disabled
            ? colorsLight.DISABLED_TEXT_COLOR
            : backgroundColor,
        },
      ]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
