import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import {useAuthProvider} from '@/context/AuthContext';

interface Props {
  item: ISongResponse;
}

export const RenderItemsSongs = ({item}: Props) => {
  const [imgSongs, setImgSong] = useState('');
  const navigation = useNavigation();

  const getSongUrl = async () => {
    const signedURL = item?.img;
    setImgSong(signedURL);
  };

  useEffect(() => {
    getSongUrl();
  }, [item?.img]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(RootStackRoutes.SONG_DETAIL, {
          id: item.id,
        })
      }>
      <View row style={styles.containerSong}>
        <View row style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: imgSongs || '',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.textSong}>
              {item.name}
            </Text>
            <Text style={styles.textArtist}>{item?.artist?.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 75,
    borderRadius: 16,
    marginRight: 10,
  },
  content: {
    marginVertical: 8,
    alignItems: 'center',
    rowGap: 40,
  },
  textSong: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Satoshi-Normal',
    marginBottom: 5,
    maxWidth: 200,
  },
  textArtist: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: colorsLight.GRAY_03,
  },
  containerSong: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
