import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useActions} from './useActions';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {StyleSheet, FlatList} from 'react-native';
import {ContainerSafeArea, SearchBar} from '@/components';
import {
  ArtistEntity,
  IArtistResponse,
} from '@/api/artist/entities/artistEntity';
import {RenderItemsArtist} from './RenderItemsArtist';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';
import {RenderItemsSongs} from './RenderItemsSongs';

export const SongGenreDetailScreen = (
  props: RootStackScreenProps<RootStackRoutes.SONG_GENRE_DETAIL>,
) => {
  const {
    dataSongGenre,
    loadingArtist,
    loadingSong,
    searchText,
    itemsArtist,
    itemsSong,
    songs,
    artist,
    handleSearch,
    handleRefresh,
    handleNextPageSong,
    handleNextPageArtist,
  } = useActions(props);

  const renderItemsArtist = ({item}: {item: IArtistResponse}) => (
    <RenderItemsArtist item={item} />
  );
  const renderItemsSongs = ({item}: {item: ISongResponse}) => (
    <RenderItemsSongs item={item} />
  );

  return (
    <ContainerSafeArea>
      <View paddingH-20 flex>
        <Text variant="h4" style={styles.title}>
          {dataSongGenre?.name}
        </Text>
        <SearchBar
          placeholder="Search"
          style={styles.search}
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlatList
          ListHeaderComponent={
            <View>
              <View row style={styles.containerSubtitles}>
                <Text style={styles.subTitle}>Top artists</Text>
              </View>
              <FlatList
                data={itemsArtist}
                renderItem={renderItemsArtist}
                horizontal={true}
                keyExtractor={item => `${item?.id}`}
                showsHorizontalScrollIndicator={false}
                refreshing={loadingArtist}
                onEndReached={handleNextPageArtist}
                onEndReachedThreshold={0.1}
              />
              {itemsArtist && itemsArtist.length === 0 && (
                <>
                  {searchText ? (
                    <View flex-1 centerH>
                      <Text
                        color={colorsLight.PRIMARY_TEXT_COLOR}
                        variant="h6"
                        style={styles.titleCouldNotFind}>
                        No artists found with "{searchText}"
                      </Text>
                    </View>
                  ) : (
                    <>
                      {artist?.count === 0 && (
                        <View centerH flex>
                          <Text
                            style={styles.textNoFound}
                            variant="body1"
                            color={colorsLight.SECONDARY_TEXT_COLOR}>
                            No artists found
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </>
              )}
              <Text style={styles.allSongs}>All songs</Text>
            </View>
          }
          data={itemsSong}
          renderItem={renderItemsSongs}
          keyExtractor={item => `${item?.id}`}
          onRefresh={handleRefresh}
          refreshing={loadingSong}
          onEndReached={handleNextPageSong}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              {searchText ? (
                <View flex-1 centerH>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    variant="h6"
                    style={styles.titleCouldNotFind}>
                    No songs found with "{searchText}"
                  </Text>
                </View>
              ) : (
                <>
                  {songs?.data.length === 0 && (
                    <View centerH flex height={200}>
                      <Text
                        style={styles.textNoFound}
                        variant="body1"
                        color={colorsLight.SECONDARY_TEXT_COLOR}>
                        No songs found
                      </Text>
                    </View>
                  )}
                </>
              )}
            </>
          }
        />
      </View>
    </ContainerSafeArea>
  );
};
const styles = StyleSheet.create({
  title: {
    lineHeight: 41,
    fontFamily: 'Satoshi-Bold',
    letterSpacing: 0.474,
    fontStyle: 'normal',
  },
  container: {
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  search: {
    marginVertical: 20,
  },
  subTitle: {
    fontFamily: 'Satoshi-Black',
    fontSize: 19,
    fontStyle: 'normal',
  },
  containerSubtitles: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  allSongs: {
    fontFamily: 'Satoshi-Black',
    fontSize: 19,
    fontStyle: 'normal',
    marginBottom: 20,
    marginTop: 10,
  },
  titleCouldNotFind: {
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
  },
  subtitleCouldNotFind: {
    fontFamily: 'Satoshi-Regular',
    marginTop: 14,
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
  },
});
