import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArtistEntity, IArtistResponse} from '@/api/artist/entities/artistEntity';
import {View} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';

interface Props {
  item: IArtistResponse;
  searchText?: string;
}

export const RenderItemsArtist = ({item, searchText}: Props) => {
  const navigation = useNavigation();
  const [imgArtist, setImgArtist] = useState('');

  const getArtistUrl = async () => {
    const signedURL = item.img;
    setImgArtist(signedURL);
  };

  useEffect(() => {
    getArtistUrl();
  }, [item?.img]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const randomBorderColor = getRandomColor();

  const handleNavigateToArtist = () => {
    navigation.navigate(RootStackRoutes.ARTIST_DETAIL, {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToArtist}>
      <View center style={styles.containerItem}>
        <FastImage
          style={[styles.img, {borderColor: randomBorderColor}]}
          source={{
            uri: imgArtist || '',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {searchText && (
          <Text
            variant="body2"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.text}>
            {item.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containerItem: {
    alignItems: 'center',
  },
  img: {
    height: 72,
    width: 72,
    borderRadius: 72,
    alignContent: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    width: 80,
    textAlign: 'center',
    marginTop: 14,
    fontFamily: 'Satoshi-Medium',
  },
});
