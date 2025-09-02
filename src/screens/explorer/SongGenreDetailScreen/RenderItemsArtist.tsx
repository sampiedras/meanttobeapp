import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArtistEntity,
  IArtistResponse,
} from '@/api/artist/entities/artistEntity';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import {RootStackRoutes} from '@/types/stackRoutes';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: IArtistResponse;
}

export const RenderItemsArtist = ({item}: Props) => {
  const navigation = useNavigation();
  const [imgArtist, setImgArtist] = useState('');

  const getArtistUrl = async () => {
    const signedURL = item?.img;
    setImgArtist(signedURL);
  };

  useEffect(() => {
    getArtistUrl();
  }, [item?.img]);

  const handleNavigateToArtist = () => {
    navigation.navigate(RootStackRoutes.ARTIST_DETAIL, {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToArtist}>
      <View center style={styles.itemContainer}>
        <FastImage
          style={styles.img}
          source={{
            uri: imgArtist || '',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 8, // Espacio horizontal entre elementos
  },
  itemContainer: {
    alignItems: 'center',
  },
  img: {
    height: 102,
    width: 102,
    borderRadius: 24,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    width: 100,
    textAlign: 'center',
    marginVertical: 14,
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Satoshi-Medium',
  },
});
