import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {useActions} from './useActions';
import {ContainerSafeArea, FlatListWrap, SearchBar} from '@/components';
import {Text} from '@react-native-material/core';
import {IArtistResponse} from '@/api/artist/entities/artistEntity';
import {RenderItemsArtist} from './RenderItemsArtist';
import {RenderItemsSongs} from './RenderItemsSongs';
import {ISongResponse, SongEntity} from '@/api/song/entities/songEntity';

export const SongsScreen = (
  props: RootStackScreenProps<RootStackRoutes.SONGS>,
) => {
  const {navigation} = props;
  const {
    // data,
    nameToSearch,
    loadingArtist,
    loadingSongGenre,
    itemsArtist,
    artists,
    dataSongs,
    songGenreData,
    handleSearch,
    handleNextPageArtist,
    handleRefresh,
  } = useActions();

  const [foundSearch, setFoundSearch] = useState(false);

  const renderItemsArtist = ({item}: {item: IArtistResponse}) => (
    <RenderItemsArtist item={item} searchText={nameToSearch} />
  );
  const renderItemsSongs = ({item}: {item: ISongResponse}) => (
    <RenderItemsSongs item={item} />
  );

  const handleNavigate = (itemId: string) => {
    navigation.navigate(RootStackRoutes.SONG_GENRE_DETAIL, {
      id: itemId,
    });
  };

  useEffect(() => {
    if (
      songGenreData?.length === 0 &&
      itemsArtist.length === 0 &&
      dataSongs?.data.length === 0
    ) {
      setFoundSearch(false);
    } else {
      setFoundSearch(true);
    }
  }, [
    dataSongs && dataSongs?.data,
    itemsArtist && itemsArtist.length,
    songGenreData && songGenreData?.length,
  ]);

  return (
    <ContainerSafeArea>
      <View
        flex
        paddingH-16
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}>
        <View paddingH-8>
          <Text variant="h4" style={styles.title}>
            Songs
          </Text>
          <SearchBar
            placeholder="Search"
            style={styles.search}
            value={nameToSearch}
            onChangeText={handleSearch}
          />
        </View>
        {foundSearch ? (
          <FlatListWrap
            refreshing={handleRefresh}
            isLoading={loadingArtist || loadingSongGenre}
            onPressNavigation={handleNavigate}
            ListHeaderComponent={
              <View>
                {foundSearch ? <Text style={styles.subTitle}>Genres</Text> : ''}
              </View>
            }
            ListFooterComponent={
              <View marginB-10>
                <View
                  marginH-9
                  marginB-16
                  marginT-20
                  row
                  style={styles.containerSubtitles}>
                  <Text style={styles.textTopArtist}>Artists</Text>
                </View>
                <FlatList
                  data={itemsArtist || []}
                  renderItem={renderItemsArtist}
                  horizontal={true}
                  keyExtractor={(item, index) => `${item?.id}-${index}`}
                  showsHorizontalScrollIndicator={false}
                  refreshing={loadingArtist}
                  onEndReached={handleNextPageArtist}
                  onEndReachedThreshold={1}
                />
                {itemsArtist && itemsArtist.length === 0 && (
                  <>
                    {nameToSearch ? (
                      <View flex-1 centerH>
                        <Text
                          color={colorsLight.PRIMARY_TEXT_COLOR}
                          variant="h6"
                          style={styles.titleCouldNotFind}>
                          No artists found with "{nameToSearch}"
                        </Text>
                      </View>
                    ) : (
                      <>
                        {artists?.count === 0 && (
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
                {nameToSearch && (
                  <View marginB-10>
                    <View
                      marginH-9
                      marginB-16
                      marginT-20
                      row
                      style={styles.containerSubtitles}>
                      <Text style={styles.textTopArtist}>Songs</Text>
                    </View>
                    <FlatList
                      data={dataSongs?.data || []}
                      renderItem={renderItemsSongs}
                      keyExtractor={item => `${item?.id}-${item?.name}`}
                      showsHorizontalScrollIndicator={false}
                      ListEmptyComponent={
                        <>
                          {nameToSearch && (
                            <View flex-1 centerH>
                              <Text
                                color={colorsLight.PRIMARY_TEXT_COLOR}
                                variant="h6"
                                style={styles.titleCouldNotFind}>
                                No songs found with "{nameToSearch}"
                              </Text>
                            </View>
                          )}
                        </>
                      }
                    />
                  </View>
                )}
              </View>
            }
            ListEmptyComponent={
              <>
                {nameToSearch ? (
                  <View flex-1 centerH>
                    <Text
                      color={colorsLight.PRIMARY_TEXT_COLOR}
                      variant="h6"
                      style={styles.titleCouldNotFind}>
                      No genre found with "{nameToSearch}"
                    </Text>
                  </View>
                ) : (
                  <>
                    {songGenreData && songGenreData.length === 0 && (
                      <View centerH flex height={200} paddingT-90>
                        <Text
                          style={styles.textNoFound}
                          variant="body1"
                          color={colorsLight.SECONDARY_TEXT_COLOR}>
                          No songs genre found
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </>
            }
            dataItem={songGenreData}
            imageProperty={'coverImg'}
          />
        ) : (
          <View center flex>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              variant="h6"
              style={styles.titleCouldNotFind}>
              Could not find anything with{'\n'}"{nameToSearch}"
            </Text>
          </View>
        )}
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
  subTitle: {
    fontFamily: 'Satoshi-Black',
    fontSize: 18,
    fontStyle: 'normal',
    marginBottom: 16,
    marginTop: 8,
  },
  textTopArtist: {
    fontFamily: 'Satoshi-Black',
    fontSize: 18,
    fontStyle: 'normal',
  },
  containerSubtitles: {
    justifyContent: 'space-between',
  },
  search: {
    marginVertical: 24,
  },
  titleCouldNotFind: {
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
  },
  textNoFound: {
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center',
  },
});
