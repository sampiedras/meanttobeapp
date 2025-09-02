import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';

interface IViewCouldNotFindFragment {
  searchText: string;
}

export const ViewCouldNotFindFragment = ({
  searchText,
}: IViewCouldNotFindFragment) => {
  return (
    <View center flex-1 paddingT-90 height={400}>
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        variant="h6"
        style={styles.titleCouldNotFind}>
        Could not find{'\n'}"{searchText}"
      </Text>
      <Text
        color={colorsLight.SECONDARY_TEXT_COLOR}
        variant="body2"
        style={styles.subtitleCouldNotFind}>
        Search again or try a different keyword
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleCouldNotFind: {
    fontFamily: 'Satoshi-Bold',
    textAlign: 'center',
  },
  subtitleCouldNotFind: {
    fontFamily: 'Satoshi-Regular',
    marginTop: 14,
  },
});
