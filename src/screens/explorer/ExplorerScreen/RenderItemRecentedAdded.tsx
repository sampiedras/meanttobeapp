import {Linking, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-ui-lib';
import {Tag} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {format, parseISO} from 'date-fns';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {RootStackRoutes} from '@/types/stackRoutes';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  item: {
    id: number;
    name: string;
    img?: string;
    newsUrl?: string;
    title?: string;
    urlYouTube?: string;
    coverImage?: string;
    urlSong?: string;
    verseQuote?: string;
    erased: boolean;
    created_at: string;
    updated_at: string;
    type: string;
  };
}

export const RenderItemRecentedAdded = ({item}: Props) => {
  const [image, setImage] = useState('');
  const [formatDate, setFormatDate] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (item?.created_at) {
      const date = parseISO(item?.created_at);
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
      if (item && item?.img) {
        setImage(item.img);
      } else {
        setImage(item.coverImage || '');
      }
    }
  }, [item]);

  const handleDetail = (
    id: number,
    name: string,
    urlSong: string | any,
    newsUrl: string | any,
    title: string | any,
    urlYouTube: string | any,
    verseQuote: string | any,
    img: string | any,
  ) => {
    if (item.type === 'sermon') {
      navigation.navigate(RootStackRoutes.SERMON_DETAIL, {
        id: id,
        title: title,
        urlYouTube: urlYouTube,
      });
    } else if (item.type === 'song') {
      navigation.navigate(RootStackRoutes.SONG_DETAIL, {
        id: id,
        name: name,
        ulrSong: urlSong,
      });
    } else if (item.type === 'news') {
      Linking.openURL(newsUrl);
    } else if (item.type === 'verse') {
      navigation.navigate(RootStackRoutes.VERSES_DETAIL, {
        id: id,
        text: name,
        reference: verseQuote,
        img: img,
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        handleDetail(
          item.id,
          item.name,
          item.urlSong,
          item.newsUrl,
          item.title,
          item.urlYouTube,
          item.verseQuote,
          item.img,
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
        {item.type === 'sermon' ? item.title : item.name}
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
