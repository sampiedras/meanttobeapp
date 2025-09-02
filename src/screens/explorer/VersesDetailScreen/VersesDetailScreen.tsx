import {StyleSheet} from 'react-native';
import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {colorsLight} from '@/theme/colorsLight';
import {useActions} from './useActions';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {TouchableOpacity} from 'react-native';
import {LogoHeartIcon} from '@/assets/svg';

const RenderRightButton = (handlePress: () => void) => {
  return (
    <TouchableOpacity>
      <Text color={colorsLight.PRIMARY_COLOR} onPress={handlePress}>
        Share
      </Text>
    </TouchableOpacity>
  );
};

export const VersesDetailScreen = (
  props: RootStackScreenProps<RootStackRoutes.VERSES_DETAIL>,
) => {
  const {verseData, verseReference} = useActions(props, RenderRightButton);

  return (
    <View
      flex
      paddingH-16
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}>
      <Text style={styles.title}>{verseReference?.reference}</Text>

      <FastImage
        source={{uri: verseData?.shareImg || ''}}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          style={styles.imageShadow}
          colors={['rgba(31, 31, 35, 0.5)', '#000']}>
          <View row centerV absT marginT-32 style={styles.appNameContainer}>
            <LogoHeartIcon />
            <Text color={colorsLight.WHITE} style={styles.appName}>
              Mean to Be
            </Text>
          </View>

          <Text color={colorsLight.WHITE} style={styles.verseName}>
            {verseData?.name}
          </Text>
          <Text color={colorsLight.GRAY_05} style={styles.verseQuote}>
            {verseReference?.reference}
          </Text>
        </LinearGradient>
      </FastImage>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: colorsLight.BLACK,
    alignSelf: 'center',
    marginVertical: 24,
    fontFamily: 'Satoshi-Medium',
  },
  image: {
    width: '100%',
    height: 564,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageShadow: {
    padding: 32,
    width: '100%',
    height: 564,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  appNameContainer: {
    alignSelf: 'center',
  },
  appName: {
    fontSize: 16,
    fontFamily: 'Satoshi-Black',
    marginLeft: 12,
  },
  verseName: {
    fontSize: 24,
    fontFamily: 'Satoshi-Black',
    marginBottom: 24,
  },
  titleAndAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  verseQuote: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
});
