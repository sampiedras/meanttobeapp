import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native-ui-lib';
import {format, parseISO} from 'date-fns';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';
import {ISermonResponse} from '@/api/sermon/entities/sermonEntity';
import {colorsLight} from '@/theme/colorsLight';
import FastImage from 'react-native-fast-image';

interface Props {
  item: ISermonResponse;
  handleNavigateDetail: (id: string) => void;
}

export const RenderItem = ({item, handleNavigateDetail}: Props) => {
  const [isLike, setIsLike] = useState(false);
  const [formatDate, setFormatDate] = useState('');

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const getYouTubeThumbnailUrl = (videoId: string | null) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` || '';
  };

  const youTubeUrl = item.urlYouTube;
  const videoId = getYouTubeVideoId(youTubeUrl);
  const imageUrl = getYouTubeThumbnailUrl(videoId);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigateDetail(item.id)}>
      <View style={styles.headContent} width="100%">
        <FastImage
          source={{
            uri:
              getYouTubeThumbnailUrl(getYouTubeVideoId(item.urlYouTube)) || '',
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
        />
        <View style={styles.shadow} />
        <View style={styles.iconContainer}>
          {isLike ? (
            <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
              <View padding-4>
                <LocalSvg
                  width={25}
                  height={25}
                  asset={require('../../../assets/svg/heart_active.svg')}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
              <View padding-4>
                <LocalSvg
                  width={25}
                  height={25}
                  asset={require('../../../assets/svg/like.svg')}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.title} variant="body2" color={colorsLight.BLACK}>
        {item.title}
      </Text>
      <Text
        style={styles.textCreationDate}
        variant="caption"
        color={colorsLight.BLACK}
        numberOfLines={2}>
        {format(parseISO(item.creationDate), 'MMMM dd yyyy') || ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: '100%',
    borderColor: colorsLight.GRAY_02,
    marginVertical: 12,
  },
  headContent: {
    borderRadius: 16,
    height: 160,
  },
  title: {
    marginVertical: 8,
    fontFamily: 'Satoshi-Bold',
  },
  textCreationDate: {
    fontFamily: 'Satoshi-Regular',
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 4,
    top: 4,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
  },
});
