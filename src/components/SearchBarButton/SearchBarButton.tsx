import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';

interface Props {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const SearchBarButton = ({placeholder, style, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        row
        centerV
        paddingH-16
        width="100%"
        height={42}
        style={[styles.containerInput, style]}>
        <LocalSvg
          asset={require('../../assets/svg/search_icon.svg')}
          width={18}
          height={18}
        />
        <Text color={colorsLight.GRAY_03} variant="body1" style={styles.input}>
          {placeholder}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    borderColor: colorsLight.GRAY_02,
    borderWidth: 1,
    borderRadius: 12,
    gap: 8,
  },
  input: {
    fontFamily: 'Satoshi-Regular',
  },
});
