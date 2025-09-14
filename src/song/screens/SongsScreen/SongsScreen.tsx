import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import {
  AppContainerSafeArea,
  FlatListWrap,
  SearchBar,
} from "@/core/components";
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

export const SongsContent = (
  _props: RootStackScreenProps<E_SongStackRoutes.SONGS>,
) => {
  const {
    dataSongs,
    artists,
    songGenreData,
    itemsArtist,
    foundSearch,
    nameToSearch,
    loadingArtist,
    loadingSongGenre,
    handleSearch,
    handleRefresh,
    handleNextPageArtist,
    handleNavigate,
  } = useViewModelProvider();

  const renderItemsArtist = ({ item }: { item: IArtistResponse }) => (
    <RenderItemsArtistFragment item={item} />
  );
  const renderItemsSongs = ({ item }: { item: ISongResponse }) => (
    <RenderItemsSongFragment item={item} />
  );

  return (
    <AppContainerSafeArea>
      <View
        style={[
          styles.container,
          { backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR },
        ]}
      >
        <View style={styles.paddingH8}>
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
          <>
            {loadingSongGenre ? (
              <MotiView
                transition={{
                  type: "timing",
                }}
                style={styles.containerSkeleton}
                animate={{
                  backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
                }}
              >
                <View style={[styles.fullWidth, styles.rowSpread]}>
                  <Skeleton colorMode="light" width={160} height={160} />
                  <Skeleton colorMode="light" width={160} height={160} />
                </View>
                <View
                  style={[styles.fullWidth, styles.rowSpread, styles.marginV8]}
                >
                  <Skeleton colorMode="light" width={160} height={160} />
                  <Skeleton colorMode="light" width={160} height={160} />
                </View>
              </MotiView>
            ) : (
              <FlatListWrap
                refreshing={handleRefresh}
                isLoading={loadingArtist || loadingSongGenre}
                onPressNavigation={handleNavigate}
                ListHeaderComponent={
                  <View>
                    {foundSearch ? (
                      <Text style={styles.subTitle}>Genres</Text>
                    ) : (
                      ""
                    )}
                  </View>
                }
                ListFooterComponent={
                  <View style={styles.marginB10}>
                    <View
                      style={[
                        styles.marginH9,
                        styles.marginB16,
                        styles.marginT20,
                        styles.row,
                        styles.containerSubtitles,
                      ]}
                    >
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
                    {nameToSearch && (
                      <View style={styles.marginB10}>
                        <View
                          style={[
                            styles.marginH9,
                            styles.marginB16,
                            styles.marginT20,
                            styles.row,
                            styles.containerSubtitles,
                          ]}
                        >
                          <Text style={styles.textTopArtist}>Songs</Text>
                        </View>
                        <FlatList
                          data={dataSongs?.data || []}
                          renderItem={renderItemsSongs}
                          keyExtractor={(item) => `${item?.id}-${item?.name}`}
                          showsHorizontalScrollIndicator={false}
                          ListEmptyComponent={
                            <>
                              {nameToSearch && (
                                <View style={styles.flex1CenterH}>
                                  <Text
                                    color={colorsLight.PRIMARY_TEXT_COLOR}
                                    variant="h6"
                                    style={styles.titleCouldNotFind}
                                  >
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
                      <View style={styles.flex1CenterH}>
                        <Text
                          color={colorsLight.PRIMARY_TEXT_COLOR}
                          variant="h6"
                          style={styles.titleCouldNotFind}
                        >
                          No genre found with "{nameToSearch}"
                        </Text>
                      </View>
                    ) : (
                      <>
                        {songGenreData && songGenreData.length === 0 && (
                          <View style={styles.centerHFlexH200PaddingT90}>
                            <Text
                              style={styles.textNoFound}
                              variant="body1"
                              color={colorsLight.SECONDARY_TEXT_COLOR}
                            >
                              No songs genre found
                            </Text>
                          </View>
                        )}
                      </>
                    )}
                  </>
                }
                dataItem={songGenreData}
                imageProperty={"coverImg"}
              />
            )}
          </>
        ) : (
          <View style={styles.centerFlex}>
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              variant="h6"
              style={styles.titleCouldNotFind}
            >
              Could not find anything with{"\n"}"{nameToSearch}"
            </Text>
          </View>
        )}
      </View>
    </AppContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  paddingH8: { paddingHorizontal: 8 },
  title: {
    lineHeight: 41,
    fontFamily: "Satoshi-Bold",
    letterSpacing: 0.474,
    fontStyle: "normal",
  },
  subTitle: {
    fontFamily: "Satoshi-Black",
    fontSize: 18,
    fontStyle: "normal",
    marginBottom: 16,
    marginTop: 8,
  },
  textTopArtist: {
    fontFamily: "Satoshi-Black",
    fontSize: 18,
    fontStyle: "normal",
  },
  containerSubtitles: {
    justifyContent: "space-between",
  },
  search: {
    marginVertical: 24,
  },
  titleCouldNotFind: {
    fontFamily: "Satoshi-Medium",
    textAlign: "center",
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
    textAlign: "center",
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
  fullWidth: { width: "100%" },
  rowSpread: { flexDirection: "row", justifyContent: "space-between" },
  marginV8: { marginVertical: 8 },
  marginB10: { marginBottom: 10 },
  marginH9: { marginHorizontal: 9 },
  marginB16: { marginBottom: 16 },
  marginT20: { marginTop: 20 },
  row: { flexDirection: "row" },
  flex1CenterH: { flex: 1, alignItems: "center" },
  centerHFlex: { flex: 1, alignItems: "center" },
  centerHFlexH200PaddingT90: {
    flex: 1,
    alignItems: "center",
    height: 200,
    paddingTop: 90,
  },
  centerFlex: { alignItems: "center", justifyContent: "center", flex: 1 },
});

export const SongsScreen = (
  props: RootStackScreenProps<E_SongStackRoutes.SONGS>,
) => (
  <ViewModelProvider>
    <SongsContent {...props} />
  </ViewModelProvider>
);
