import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';

interface Props {
  name: string;
  isActive?: boolean;
  item: string | number;
  handleSelect: (item: string | string) => void;
}

export const TypeFragment = ({name, isActive, item, handleSelect}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(item.toString())}
      style={[
        {
          backgroundColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_LIGHT,
        },
      ]}>
      <Text
        lineBreakStrategyIOS="standard"
        numberOfLines={1}
        color={isActive ? colorsLight.WHITE : colorsLight.SECONDARY_TEXT_COLOR}
        style={styles.text}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
  },
});
