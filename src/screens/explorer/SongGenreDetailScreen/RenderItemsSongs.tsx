import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import {LocalSvg} from 'react-native-svg';
import {useAuthProvider} from '@/context/AuthContext';
import {
  useCreateSongLikeMutation,
  useDeleteSongLikeMutation,
} from '@/api/song/songApi';

interface Props {
  item: ISongResponse;
}

export const RenderItemsSongs = ({item}: Props) => {
  const {user} = useAuthProvider();
  const [imgSongs, setImgSong] = useState('');
  const navigation = useNavigation();
  const [isLike, setIsLike] = useState(false);
  const [createSongLike] = useCreateSongLikeMutation();
  const [handleDeleteSongLiked] = useDeleteSongLikeMutation();

  const getSongUrl = async () => {
    const signedURL = item?.img;
    setImgSong(signedURL);
  };

  useEffect(() => {
    getSongUrl();
  }, [item?.img]);

  // const createLike = () => {
  //   const body = {
  //     user_id: (user && user?.id) || '',
  //     song_id: item && item.id,
  //   };
  //   createSongLike(body).unwrap();
  //   setIsLike(true);
  // };

  // const deleteLikeSong = () => {
  //   const idLikedSong = item.id;
  //   handleDeleteSongLiked(idLikedSong);
  //   setIsLike(false);
  // };

  // useEffect(() => {
  //   const myId = user?.id;
  //   if (myId !== undefined && item?.id !== undefined) {
  //     const likedByCurrentUser = item?.userSongLike?.some(
  //       like => like?.user?.id === myId && like?.song?.id === item?.id,
  //     );
  //     setIsLike(likedByCurrentUser);
  //   }
  // }, [user, item]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(RootStackRoutes.SONG_DETAIL, {
          id: item.id,
        })
      }>
      <View row style={styles.containerSongAndLogoHeart}>
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
        <View>
          {isLike ? (
            <TouchableOpacity onPress={() => {}}>
              <View padding-4>
                <LocalSvg
                  asset={require('../../../assets/svg/heart_active.svg')}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {}}>
              <View padding-4>
                <LocalSvg
                  asset={require('../../../assets/svg/heart_gray.svg')}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  containerSongAndLogoHeart: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
