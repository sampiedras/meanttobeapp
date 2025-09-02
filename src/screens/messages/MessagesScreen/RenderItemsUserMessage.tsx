import React from 'react';
import {IUserMessageEntity} from '@/interfaces/userMessageEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {LocalSvg} from 'react-native-svg';

interface Props {
  item: IUserMessageEntity;
}

export const RenderItemsUserMessage = ({item}: Props) => {
  return (
    <TouchableOpacity>
      <View row style={styles.container}>
        <FastImage style={styles.avatar} source={{uri: item.avatar}} />
        <View row flex style={styles.containerItems}>
          <View style={styles.containerText}>
            <Text
              variant="body1"
              style={styles.textName}
              color={colorsLight.PRIMARY_TEXT_COLOR}>
              {item.name}
            </Text>
            <Text
              variant="body2"
              style={styles.textLastMessage}
              color={colorsLight.SECONDARY_TEXT_COLOR}>
              {item.lastMessage}
            </Text>
          </View>
          <View>
            <Text
              color={colorsLight.SECONDARY_TEXT_COLOR}
              variant="body2"
              style={styles.textTime}>
              12:25 PM
            </Text>
            <View style={styles.containerIcon}>
              <LocalSvg asset={require('../../../assets/svg/check_view.svg')} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 100,
    marginRight: 20,
  },
  containerItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'column',
  },
  textName: {
    fontFamily: 'Satoshi-Bold',
    marginBottom: 2,
  },
  textLastMessage: {
    fontFamily: 'Satoshi-Regular',
  },
  textTime: {
    marginBottom: 2,
    fontFamily: 'Satoshi-Medium',
  },
  containerIcon: {
    alignItems: 'flex-end',
  },
});
