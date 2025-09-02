import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {useActionsSermonDetail} from './useActions';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import YoutubePlayer from 'react-native-youtube-iframe';
import {LocalSvg} from 'react-native-svg';
import FastImage from 'react-native-fast-image';

export const SermonDetailScreen = (
  props: RootStackScreenProps<RootStackRoutes.SERMON_DETAIL>,
) => {
  const {
    dataSermonById,
    playing,
    formatDate,
    videoId,
    imageUrl,
    handlePress,
    onStateChange,
  } = useActionsSermonDetail(props);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScroll}>
        <View marginT-36>
          <TouchableOpacity onPress={handlePress}>
            {!playing ? (
              <>
                <FastImage
                  source={{
                    uri: imageUrl && imageUrl,
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
              </>
            ) : null}
          </TouchableOpacity>
          {playing && (
            <View style={styles.containerVideo}>
              <YoutubePlayer
                height={200}
                play={playing}
                videoId={videoId || undefined}
                onChangeState={onStateChange}
              />
            </View>
          )}
        </View>
        <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.title}>
          {dataSermonById?.title}
        </Text>
        <Text color={colorsLight.GREEN} style={styles.textCreationDate}>
          {formatDate}
        </Text>
        <View
          width="100%"
          backgroundColor={colorsLight.GRAY_DIVIDER}
          height={1}
          marginV-28
        />
        <Text
          color={colorsLight.SECONDARY_TEXT_COLOR}
          style={styles.description}>
          {dataSermonById?.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerScroll: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 16,
  },
  image: {
    flex: 1,
    borderRadius: 16,
    width: '100%',
    height: 200,
  },
  containerVideo: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Satoshi-Medium',
    marginVertical: 16,
  },
  textCreationDate: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
  },
  description: {
    fontFamily: 'Satoshi-Regular',
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
});
