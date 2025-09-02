import {ArrowBackIcon, CallIcon, VideoCallIcon} from '@/assets/svg';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-ui-lib';

interface ICustomHeader {
  name?: string | undefined;
  avatar?: string | undefined;
  handleGoBack?: () => void;
  handleGoToDetail?: () => void;
}

export const CustomHeader = ({
  name,
  avatar,
  handleGoBack,
  handleGoToDetail,
}: ICustomHeader) => {
  return (
    <View
      row
      center
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
      paddingH-16
      height={60}
      style={styles.container}>
      <View row center>
        <TouchableOpacity style={styles.btnArrowBack} onPress={handleGoBack}>
          <ArrowBackIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnAvatar} onPress={handleGoToDetail}>
          <FastImage source={{uri: avatar}} style={styles.avatar} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.textName}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
  },
  btnArrowBack: {
    marginRight: 19,
  },
  btnAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: colorsLight.PRIMARY_COLOR,
    marginRight: 16,
  },
  textName: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    maxWidth: 170,
  },
});
