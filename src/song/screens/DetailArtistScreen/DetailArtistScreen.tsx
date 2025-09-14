import React from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { WhiteBlackArrowIcon } from "@/song/assets/svg";
import { ISongResponse } from "@/song/data/remote/entities/songEntity";
import { E_SongStackRoutes } from "@/song/routes";
import { RenderItemSongFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailArtistContent =
  ({}: RootStackScreenProps<E_SongStackRoutes.DETAIL_ARTIST>) => {
    const { goBack } = useNavigation();
    const {
      songs,
      artistData,
      loadingSong,
      handleRefresh,
      handleNextPageSong,
      itemsSong,
    } = useViewModelProvider();

    const renderItemsSongs = ({ item }: { item: ISongResponse }) => (
      <RenderItemSongFragment item={item} />
    );

    return (
      <AppContainerSafeArea>
        {artistData?.img && artistData?.img !== "" && (
          <ImageBackground
            style={styles.imageBackGround}
            source={{
              uri: artistData?.img,
            }}
          >
            <TouchableOpacity style={styles.touchableOpacity} onPress={goBack}>
              <WhiteBlackArrowIcon />
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
              colors={["rgba(255, 255, 255, 0.9)", "transparent"]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
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
        <View style={[styles.listBody, styles.listContainer]}>
          <View style={styles.listHandle} />
          <FlatList
            data={itemsSong}
            renderItem={renderItemsSongs}
            keyExtractor={(item) => `${item?.id}`}
            onRefresh={handleRefresh}
            refreshing={loadingSong}
            onEndReached={songs && songs?.count > 2 ? handleNextPageSong : null}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <>
                {songs?.count === 0 && (
                  <View
                    style={[
                      styles.centerH,
                      styles.flex,
                      styles.height200,
                      styles.paddingT90,
                    ]}
                  >
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
            }
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  imageBackGround: {
    height: Dimensions.get("window").height / 2,
    paddingHorizontal: 16,
    position: "relative",
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  listContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -24,
  },
  listBody: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
  },
  listHandle: {
    height: 6,
    width: 50,
    marginVertical: 14,
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: colorsLight.GRAY_04,
  },
  shadowOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  touchableOpacity: {
    position: "absolute",
    zIndex: 1,
    top: 28,
    left: 16,
  },
  textContainer: {
    position: "absolute",
    bottom: 40,
    left: 16,
    right: 16,
    alignItems: "center",
  },
  artistName: {
    textAlign: "center",
    fontFamily: "Satoshi-Black",
    lineHeight: 32,
    fontStyle: "normal",
    fontSize: 24,
  },
  countSongs: {
    textAlign: "center",
    fontFamily: "Satoshi-Medium",
    lineHeight: 32,
    fontStyle: "normal",
    color: colorsLight.GRAY_03,
  },
  textNoFound: {
    fontFamily: "Satoshi-Regular",
  },
  centerH: { alignItems: "center" },
  flex: { flex: 1 },
  height200: { height: 200 },
  paddingT90: { paddingTop: 90 },
});

export const DetailArtistScreen = (
  props: RootStackScreenProps<E_SongStackRoutes.DETAIL_ARTIST>,
) => (
  <ViewModelProvider id={props.route.params?.id}>
    <DetailArtistContent {...props} />
  </ViewModelProvider>
);
