import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native-ui-lib";
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

export const SongsContent =
  ({}: RootStackScreenProps<E_SongStackRoutes.SONGS>) => {
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
          flex
          paddingH-16
          backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        >
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
                  <View width="100%" row spread>
                    <Skeleton colorMode="light" width={160} height={160} />
                    <Skeleton colorMode="light" width={160} height={160} />
                  </View>
                  <View width="100%" row spread marginV-8>
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
                    <View marginB-10>
                      <View
                        marginH-9
                        marginB-16
                        marginT-20
                        row
                        style={styles.containerSubtitles}
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
                            <View flex-1 centerH>
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
                                <View centerH flex>
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
                        <View marginB-10>
                          <View
                            marginH-9
                            marginB-16
                            marginT-20
                            row
                            style={styles.containerSubtitles}
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
                                  <View flex-1 centerH>
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
                        <View flex-1 centerH>
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
                            <View centerH flex height={200} paddingT-90>
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
            <View center flex>
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
});

export const SongsScreen = (
  props: RootStackScreenProps<E_SongStackRoutes.SONGS>,
) => (
  <ViewModelProvider>
    <SongsContent {...props} />
  </ViewModelProvider>
);
