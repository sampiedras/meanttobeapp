import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {LocalSvg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
// import {
//   useCreateSongLikeMutation,
//   useDeleteSongLikeMutation,
// } from '@/api/song/songApi';
import {useAuthProvider} from '@/context/AuthContext';

interface Props {
  item: ISongResponse;
}

export const RenderItemSong = ({item}: Props) => {
  // const {user} = useAuthProvider();
  const [isLike, setIsLike] = useState(false);
  const navigation = useNavigation();
  // const [createSongLike] = useCreateSongLikeMutation();
  // const [handleDeleteSongLiked] = useDeleteSongLikeMutation();

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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RootStackRoutes.SONG_DETAIL, {
            id: item.id,
          })
        }>
        <View row style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: item?.img || '',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View row flex style={styles.containerItems}>
            <View>
              <Text numberOfLines={2} style={styles.textSong}>
                {item.name}
              </Text>
              <Text style={styles.textArtist}>{item?.artist?.name}</Text>
            </View>
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
      <View
        height={0.5}
        width="100%"
        backgroundColor={colorsLight.GRAY_04}
        style={styles.crossBar}
        marginV-20
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: colorsLight.GRAY_02,
  },
  content: {
    marginVertical: 10,
    alignItems: 'center',
    rowGap: 40,
  },
  textSong: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Satoshi-Normal',
    marginBottom: 8,
    maxWidth: 200,
  },
  textArtist: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    color: colorsLight.GRAY_03,
  },
  containerItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossBar: {alignSelf: 'center', borderRadius: 20},
});
