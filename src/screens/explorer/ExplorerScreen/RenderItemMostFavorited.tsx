import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Tag} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {format, parseISO} from 'date-fns';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import {ExplorerFavoriteEntity} from '@/api/user/entities/userEntity';

interface Props {
  item: ExplorerFavoriteEntity;
}

export const RenderItemMostFavorited = ({item}: Props) => {
  const [image, setImage] = useState('');
  const [formatDate, setFormatDate] = useState('');
  const [title, setTitle] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (item.created_at) {
      const date = parseISO(item.created_at);
      const desiredformat = 'MMMM dd yyyy';
      const formatDate = format(date, desiredformat);
      setFormatDate(formatDate);
    }
  }, [item]);

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
    if (item.type === 'sermon') {
      setTitle(item.title || '');
    } else {
      if (item.type === 'quiz') {
        setTitle(item.quiz || '');
      } else {
        setTitle(item.name || '');
      }
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
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
        variant="body2"
        color={colorsLight.BLACK}>
        {title}
      </Text>
      <Text
        style={styles.creationDateText}
        variant="caption"
        color={colorsLight.SECONDARY_TEXT_COLOR}>
        {formatDate}
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
    bottom: 55,
    alignSelf: 'flex-end',
    right: 10,
  },
  title: {
    marginTop: 4,
    fontFamily: 'Satoshi-Bold',
    maxWidth: 200,
  },
  creationDateText: {
    marginTop: 6,
    fontFamily: 'Satoshi-Regular',
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    right: 0,
    height: '100%',
    borderRadius: 8,
  },
});
