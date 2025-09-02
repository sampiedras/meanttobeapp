import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SongEntity} from '@/api/song/entities/songEntity';
import {Text} from '@react-native-material/core';
import {TouchableOpacity} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';

interface Props {
  item: SongEntity;
  handleDetail?: (id: number, name: string, ulrSong: string) => void;
}

export const RenderItemsSongs = ({item, handleDetail}: Props) => {
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    setCoverImage(item?.coverImage);
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        handleDetail && handleDetail(item.id, item.name, item.urlSong)
      }>
      <FastImage
        source={{uri: coverImage, priority: FastImage.priority.normal}}
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text
          color={colorsLight.PRIMARY_TEXT_COLOR}
          variant="body1"
          style={styles.textName}>
          {item.name}
        </Text>
        <Text
          color={colorsLight.SECONDARY_TEXT_COLOR}
          variant="body2"
          style={styles.textArtist}>
          {item?.artist?.name}
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
  },
  textArtist: {
    fontFamily: 'Satoshi-Regular',
  },
});
