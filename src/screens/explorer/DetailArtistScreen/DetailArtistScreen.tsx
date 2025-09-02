import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, FlatList} from 'react-native';
import {ContainerSafeArea} from '@/components';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {useActions} from './useActions';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {RenderItemSong} from './RenderItemSong';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';
import {colorsLight} from '@/theme/colorsLight';
import LinearGradient from 'react-native-linear-gradient';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';

export const DetailArtistScreen = (
  props: RootStackScreenProps<RootStackRoutes.ARTIST_DETAIL>,
) => {
  const {navigation} = props;
  const {
    songs,
    artistData,
    loadingSong,
    handleRefresh,
    handleNextPageSong,
    itemsSong,
  } = useActions(props);

  const renderItemsSongs = ({item}: {item: ISongResponse}) => (
    <RenderItemSong item={item} />
  );

  return (
    <ContainerSafeArea>
      {artistData?.img && artistData?.img !== '' && (
        <ImageBackground
          style={styles.imageBackGround}
          source={{
            uri: artistData?.img,
          }}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => navigation.pop()}>
            <LocalSvg
              asset={require('../../../assets/svg/white_black_arrow.svg')}
            />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text variant="h5" style={styles.artistName}>
              {artistData?.name}
            </Text>
            <Text variant="h6" style={styles.countSongs}>
              {songs?.count} songs
            </Text>
          </View>
          <LinearGradient
            style={styles.shadowOverlay}
            colors={['rgba(255, 255, 255, 0.9)', 'transparent']}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
          />
          <View style={styles.textContainer}>
            <Text variant="h5" style={styles.artistName}>
              {artistData?.name}
            </Text>
            <Text variant="h6" style={styles.countSongs}>
              {songs?.count} songs
            </Text>
          </View>
        </ImageBackground>
      )}
      <View
        paddingH-20
        flex
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        style={styles.listContainer}>
        <View height={6} width={50} marginV-14 />
        <FlatList
          data={itemsSong}
          renderItem={renderItemsSongs}
          keyExtractor={item => `${item?.id}`}
          onRefresh={handleRefresh}
          refreshing={loadingSong}
          onEndReached={songs && songs?.count > 2 ? handleNextPageSong : null}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              {songs?.count === 0 && (
                <View centerH flex height={200} paddingT-90>
                  <Text
                    style={styles.textNoFound}
                    variant="body1"
                    color={colorsLight.SECONDARY_TEXT_COLOR}>
                    No songs found
                  </Text>
                </View>
              )}
            </>
          }
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  imageBackGround: {
    height: Dimensions.get('window').height / 2,
    paddingHorizontal: 16,
    position: 'relative',
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  listContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -24,
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  touchableOpacity: {
    position: 'absolute',
    zIndex: 1,
    top: 28,
    left: 16,
  },
  textContainer: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  artistName: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Black',
    lineHeight: 32,
    fontStyle: 'normal',
    fontSize: 24,
  },
  countSongs: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Medium',
    lineHeight: 32,
    fontStyle: 'normal',
    color: colorsLight.GRAY_03,
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
