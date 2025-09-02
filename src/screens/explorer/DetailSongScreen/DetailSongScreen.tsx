import React, {useCallback, useState, useEffect} from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {StyleSheet} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LocalSvg} from 'react-native-svg';
import {useActions} from './useActions';
import {ContainerSafeArea} from '@/components';
import FastImage from 'react-native-fast-image';

export const DetailSongScreen = (
  props: RootStackScreenProps<RootStackRoutes.SONG_DETAIL>,
) => {
  const {data} = useActions(props);

  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    setPlaying(true);
  };

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const youTubeUrl = data?.data.songUrl;
  const videoId = getYouTubeVideoId(youTubeUrl ? youTubeUrl : '');

  return (
    <ContainerSafeArea>
      <View paddingH-16 marginT-20>
        {!playing ? (
          <TouchableOpacity onPress={handlePress}>
            <FastImage
              source={{
                uri: data?.data?.artist.img,
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
            />
            <View style={styles.shadow} />
            <LocalSvg
              style={styles.iconPlay}
              width={30}
              height={30}
              asset={require('../../../assets/svg/play.svg')}
            />
          </TouchableOpacity>
        ) : null}
        {playing && (
          <View style={styles.containerVideo}>
            <YoutubePlayer
              height={200}
              play={playing}
              videoId={videoId || ''}
              onChangeState={onStateChange}
            />
          </View>
        )}
        <View center marginT-20>
          <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.title}>
            {data?.data.name}
          </Text>
          <Text
            variant="h6"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.nameArtist}>
            {data?.data?.artist.name}
          </Text>
        </View>
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Satoshi-Medium',
    fontWeight: '500',
  },
  nameArtist: {
    fontStyle: 'normal',
    fontFamily: 'Satoshi-Medium',
    fontWeight: '400',
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginVertical: 8,
  },
  iconPlay: {
    alignSelf: 'center',
    top: 82,
    position: 'absolute',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
  },
  containerVideo: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
