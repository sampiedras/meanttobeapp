import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {LocalSvg} from 'react-native-svg';
import {View} from 'react-native-ui-lib';

export const ViewStartSearchFragment = () => {
  return (
    <View flex-1 width="100%" center paddingT-90>
        <LocalSvg asset={require('../../../assets/svg/start_searching.svg')} />
      <Text
        color={colorsLight.PRIMARY_TEXT_COLOR}
        variant="h6"
        style={styles.titleStartSearching}>
        Start searching
      </Text>
      <Text
        color={colorsLight.SECONDARY_TEXT_COLOR}
        variant="body2"
        style={styles.subtitleStartSearching}>
        Search for artists, sermons, verses and more
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStartSearching: {
    fontFamily: 'Satoshi-Bold',
    marginBottom: 16,
  },
  subtitleStartSearching: {
    fontFamily: 'Satoshi-Regular',
  },
});
