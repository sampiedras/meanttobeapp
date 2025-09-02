import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SermonEntity} from '@/api/sermon/entities/sermonEntity';
import {Text} from '@react-native-material/core';
import {format, parseISO} from 'date-fns';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-ui-lib';

interface Props {
  item: SermonEntity;
  handleDetail: (id: number, title: string, urlYouTube: string) => void;
}

export const RenderItemsSermons = ({item, handleDetail}: Props) => {
  const [formatDate, setFormatDate] = useState('');

  useEffect(() => {
    if (item?.creationDate) {
      const date = parseISO(item.creationDate);
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
      style={styles.container}
      onPress={() => handleDetail(item.id, item.title, item.urlYouTube)}>
      <FastImage
        source={{uri: imageUrl, priority: FastImage.priority.normal}}
        style={styles.image}
      />
      <View style={styles.containerText}>
        <Text
          color={colorsLight.PRIMARY_TEXT_COLOR}
          variant="body1"
          style={styles.textName}>
          {item.title}
        </Text>
        <Text
          color={colorsLight.SECONDARY_TEXT_COLOR}
          variant="body2"
          style={styles.textArtist}>
          {formatDate}
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
