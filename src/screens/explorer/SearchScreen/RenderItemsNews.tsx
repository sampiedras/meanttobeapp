import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NewEntity} from '@/api/news/entities/newsEntity';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import {colorsLight} from '@/theme/colorsLight';

interface Props {
  item: NewEntity;
  handleDetail: (newsUrl: string) => void;
}

export const RenderItemsNews = ({item, handleDetail}: Props) => {
  const [img, setImg] = useState('');

  useEffect(() => {
    setImg(item?.img);
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleDetail(item.newsUrl)}>
      <FastImage
        source={{uri: img, priority: FastImage.priority.normal}}
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colorsLight.PRIMARY_TEXT_COLOR}
          variant="body1"
          style={styles.textName}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          color={colorsLight.SECONDARY_TEXT_COLOR}
          variant="body2"
          style={styles.textArtist}>
          {item.textNews}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    height: 74,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colorsLight.GRAY_LIGHT,
    paddingVertical: 10,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  containerText: {
    flexDirection: 'column',
  },
  textName: {
    fontFamily: 'Satoshi-Medium',
    marginBottom: 4,
    maxWidth: 260,
  },
  textArtist: {
    fontFamily: 'Satoshi-Regular',
    maxWidth: 260,
  },
});
