import React from 'react';
import {IUserMessageEntity} from '@/interfaces/userMessageEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';

interface Props {
  item: IUserMessageEntity;
}

export const RenderItemsUsers = ({item}: Props) => {
  return (
    <TouchableOpacity>
      <View paddingR-14 center>
        <View padding-5 style={styles.borderAvatar}>
          <FastImage source={{uri: item.avatar}} style={styles.avatar} />
        </View>
        <Text
          variant="body1"
          color={colorsLight.PRIMARY_TEXT_COLOR}
          style={styles.textName}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 59,
    height: 59,
    borderRadius: 100,
  },
  borderAvatar: {
    borderWidth: 2,
    borderColor: '#92AC95',
    borderRadius: 100,
  },
  textName: {
    marginTop: 9,
    fontFamily: 'Satoshi-Regular',
  },
});
