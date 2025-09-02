import React from 'react';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {StyleSheet, TouchableOpacity} from 'react-native';
interface Props {
  title: string;
  isActive?: boolean;
  setActive: (item: number) => void;
  item: number;
}

export const RenderButtons = ({item, isActive, setActive, title}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => setActive(item)}
      style={[
        styles.button,
        {
          borderColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.GRAY_02,
          backgroundColor: isActive
            ? colorsLight.PRIMARY_COLOR
            : colorsLight.WHITE,
        },
      ]}>
      <Text
        lineBreakStrategyIOS="standard"
        numberOfLines={1}
        color={isActive ? colorsLight.WHITE : colorsLight.PRIMARY_TEXT_COLOR}
        style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginHorizontal: 8,
    width: 'auto',
    height: 42,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 28
  },

  text: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
});
