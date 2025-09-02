import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TopSermonsEntity} from '@/api/sermon/entities/sermonEntity';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {format, parseISO} from 'date-fns';
import FastImage from 'react-native-fast-image';

interface Props {
  item: TopSermonsEntity;
  handleNavigateDetail: (
    sermonId: number,
    title: string,
    urlYouTube: string,
  ) => void;
}

export const RenderItemTopSermons = ({item, handleNavigateDetail}: Props) => {
  const [formatDate, setFormatDate] = useState('');

  useEffect(() => {
    if (item.created_at) {
      const date = parseISO(item.created_at);
      const desiredformat = 'MMMM dd yyyy';
      const formatDate = format(date, desiredformat);
      setFormatDate(formatDate);
    }
  }, [item]);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const getYouTubeThumbnailUrl = (videoId: string | null) => {
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  };

  const youTubeUrl = item.urlYouTube;
  const videoId = getYouTubeVideoId(youTubeUrl);
  const imageUrl = getYouTubeThumbnailUrl(videoId);

  return (
    <TouchableOpacity
      onPress={() =>
        handleNavigateDetail(item.sermonId, item.title, item.urlYouTube)
      }
      style={styles.containerImage}>
      <FastImage
        source={{
          uri: imageUrl && imageUrl,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
      />
      <View style={styles.shadow} />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.title}
        variant="body2"
        color={colorsLight.BLACK}>
        {item.title}
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
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
  },
});
