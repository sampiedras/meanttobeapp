import React from 'react';
import {Text} from '@react-native-material/core';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';

interface props {
  name: string;
  isActive?: boolean;
  item: number | string;
  handleSelect: (item: number | string) => void;
}

export const CategoryFragment = ({
  name,
  isActive,
  handleSelect,
  item,
}: props) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(item)}
      style={[
        styles.button,
        {
          backgroundColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.WHITE,
          borderColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_02,
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
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 5,
    width: 'auto',
    height: 30,
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 1,
  },

  text: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
  },
});
