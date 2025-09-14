import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { AppContainerSafeArea, SearchBar } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_SongStackRoutes } from "@/song";
import { IArtistResponse } from "@/song/data/remote/entities/artistEntity";
import { ISongResponse } from "@/song/data/remote/entities/songEntity";
import {
  RenderItemsArtistFragment,
  RenderItemsSongFragment,
} from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailSongGenreContent = (
  _props: RootStackScreenProps<E_SongStackRoutes.DETAIL_SONG_GENRE>,
) => {
  const {
    dataGenre,
    songs,
    artists,
    nameToSearch,
    loadingSong,
    loadingArtist,
    itemsSong,
    itemsArtist,
    handleRefresh,
    handleSearch,
    handleNextPageSong,
    handleNextPageArtist,
  } = useViewModelProvider();

  const renderItemsArtist = ({ item }: { item: IArtistResponse }) => (
    <RenderItemsArtistFragment item={item} />
  );
  const renderItemsSongs = ({ item }: { item: ISongResponse }) => (
    <RenderItemsSongFragment item={item} />
  );

  return (
    <AppContainerSafeArea>
      <View style={styles.container}>
        <Text variant="h4" style={styles.title}>
          {dataGenre?.name}
        </Text>
        <SearchBar
          placeholder="Search"
          style={styles.search}
          value={nameToSearch}
          onChangeText={handleSearch}
        />
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={[styles.row, styles.containerSubtitles]}>
                <Text style={styles.subTitle}>Top artists</Text>
              </View>
              <FlatList
                data={itemsArtist}
                renderItem={renderItemsArtist}
                horizontal={true}
                keyExtractor={(item) => `${item?.id}`}
                showsHorizontalScrollIndicator={false}
                refreshing={loadingArtist}
                onEndReached={handleNextPageArtist}
                onEndReachedThreshold={0.1}
              />
              {itemsArtist && itemsArtist.length === 0 && (
                <>
                  {nameToSearch ? (
                    <View style={styles.flex1CenterH}>
                      <Text
                        color={colorsLight.PRIMARY_TEXT_COLOR}
                        variant="h6"
                        style={styles.titleCouldNotFind}
                      >
                        No artists found with "{nameToSearch}"
                      </Text>
                    </View>
                  ) : (
                    <>
                      {artists?.count === 0 && (
                        <View style={styles.centerHFlex}>
                          <Text
                            style={styles.textNoFound}
                            variant="body1"
                            color={colorsLight.SECONDARY_TEXT_COLOR}
                          >
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
          keyExtractor={(item) => `${item?.id}`}
          onRefresh={handleRefresh}
          refreshing={loadingSong}
          onEndReached={handleNextPageSong}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <>
              {nameToSearch ? (
                <View style={styles.flex1CenterH}>
                  <Text
                    color={colorsLight.PRIMARY_TEXT_COLOR}
                    variant="h6"
                    style={styles.titleCouldNotFind}
                  >
                    No songs found with "{nameToSearch}"
                  </Text>
                </View>
              ) : (
                <>
                  {songs?.data.length === 0 && (
                    <View style={styles.centerHFlexH200}>
                      <Text
                        style={styles.textNoFound}
                        variant="body1"
                        color={colorsLight.SECONDARY_TEXT_COLOR}
                      >
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
    </AppContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    lineHeight: 41,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.474,
    fontStyle: "normal",
  },
  search: {
    marginVertical: 20,
  },
  subTitle: {
    fontFamily: "Satoshi-Black",
    fontSize: 19,
    fontStyle: "normal",
  },
  containerSubtitles: {
    justifyContent: "space-between",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
  },
  allSongs: {
    fontFamily: "Satoshi-Black",
    fontSize: 19,
    fontStyle: "normal",
    marginBottom: 20,
    marginTop: 10,
  },
  titleCouldNotFind: {
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
  flex1CenterH: { flex: 1, alignItems: "center" },
  centerHFlex: { flex: 1, alignItems: "center" },
  centerHFlexH200: { flex: 1, alignItems: "center", height: 200 },
});

export const DetailSongGenreScreen = (
  props: RootStackScreenProps<E_SongStackRoutes.DETAIL_SONG_GENRE>,
) => (
  <ViewModelProvider id={props.route.params?.id}>
    <DetailSongGenreContent {...props} />
  </ViewModelProvider>
);
