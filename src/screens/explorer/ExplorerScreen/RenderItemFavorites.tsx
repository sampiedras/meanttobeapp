import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Tag} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {ExplorerFavoriteEntity} from '@/api/user/entities/userEntity';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';

interface Props {
  item: ExplorerFavoriteEntity;
}

export const RenderItemFavorites = ({item}: Props) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const getYouTubeThumbnailUrl = (url: string) => {
      const videoIdMatch = url.match(
        /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
      );

      if (videoIdMatch && videoIdMatch[1]) {
        setImage(
          `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`,
        );
      }
    };

    if (item.type === 'sermon') {
      getYouTubeThumbnailUrl(item.urlYouTube || '');
    } else {
      if (item && item?.coverImage) {
        setImage(item.coverImage);
      } else {
        setImage(item.imgQuiz || '');
      }
    }
    if (item.type === 'song') {
      setTitle(item.name || '');
    } else {
      setTitle(item.description || '');
    }
  }, [item]);

  const handleDetail = (
    name: string,
    urlSong: string | any,
    title: string | any,
    urlYouTube: string | any,
    sermonId: number,
    songId: number,
    quizId: number,
  ) => {
    if (item.type === 'sermon') {
      navigation.navigate(RootStackRoutes.SERMON_DETAIL, {
        id: sermonId,
        title: title,
        urlYouTube: urlYouTube,
      });
    } else if (item.type === 'song') {
      navigation.navigate(RootStackRoutes.SONG_DETAIL, {
        id: songId,
        name: name,
        ulrSong: urlSong,
      });
    } else if (item.type === 'quiz') {
      navigation.navigate(RootStackRoutes.QUIZ_QUESTIONS, {
        quizId: quizId,
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        handleDetail(
          item.name,
          item.urlSong,
          item.title,
          item.urlYouTube,
          item.sermonId,
          item.songId,
          item.quizId,
        )
      }
      style={styles.containerImage}>
      <FastImage
        source={{uri: image && image, priority: FastImage.priority.normal}}
        style={styles.image}
      />
      <LinearGradient
        style={styles.shadowOverlay}
        colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0.6}}
      />
      <Tag
        title={item.type.split('')[0].toUpperCase() + item.type.slice(1)}
        width={76}
        height={24}
        fontSize={12}
        colorTitle={colorsLight.PRIMARY_COLOR}
        backgroundColor={colorsLight.WHITE}
        style={styles.tag}
        fontFamily="Satoshi-Medium"
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.title}
        variant="body2"
        color={colorsLight.PRIMARY_TEXT_COLOR}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tag: {
    position: 'absolute',
    bottom: 36,
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontFamily: 'Satoshi-Regular',
    maxWidth: 120,
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 26,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 8,
  },
});
