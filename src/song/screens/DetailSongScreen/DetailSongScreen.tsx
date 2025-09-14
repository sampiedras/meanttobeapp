import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import FastImage from "react-native-fast-image";
import YoutubePlayer from "react-native-youtube-iframe";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { PlayIcon } from "@/song/assets/svg";
import { E_SongStackRoutes } from "@/song/routes";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailSongContent =
  ({}: RootStackScreenProps<E_SongStackRoutes.DETAIL_SONG>) => {
    const { data, videoId, playing, isFetching, handlePress, onStateChange } =
      useViewModelProvider();

    return (
      <AppContainerSafeArea>
        {isFetching ? (
          <MotiView
            transition={{
              type: "timing",
            }}
            style={styles.containerSkeleton}
            animate={{ backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR }}
          >
            <Skeleton colorMode="light" width="90%" height={180} />
          </MotiView>
        ) : (
          <View style={[styles.paddingH16, styles.marginT20]}>
            {!playing ? (
              <TouchableOpacity onPress={handlePress}>
                <FastImage
                  source={{
                    uri: data?.img || "",
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.image}
                />
                <View style={styles.shadow} />
                <PlayIcon style={styles.iconPlay} width={30} height={30} />
              </TouchableOpacity>
            ) : null}
            {playing && (
              <View style={styles.containerVideo}>
                <YoutubePlayer
                  height={200}
                  play={playing}
                  videoId={videoId || ""}
                  onChangeState={onStateChange}
                />
              </View>
            )}
            <View style={[styles.center, styles.marginT20]}>
              <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.title}>
                {data?.name}
              </Text>
              <Text
                variant="h6"
                color={colorsLight.PRIMARY_TEXT_COLOR}
                style={styles.nameArtist}
              >
                {data?.artist.name}
              </Text>
            </View>
          </View>
        )}
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  paddingH16: { paddingHorizontal: 16 },
  marginT20: { marginTop: 20 },
  image: {
    borderRadius: 16,
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: "Satoshi-Medium",
    fontWeight: "500",
  },
  nameArtist: {
    fontStyle: "normal",
    fontFamily: "Satoshi-Medium",
    fontWeight: "400",
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginVertical: 8,
  },
  iconPlay: {
    alignSelf: "center",
    top: 82,
    position: "absolute",
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 16,
  },
  containerVideo: {
    borderRadius: 16,
    overflow: "hidden",
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
  center: { alignItems: "center" },
});

export const DetailSongScreen = (
  props: RootStackScreenProps<E_SongStackRoutes.DETAIL_SONG>,
) => (
  <ViewModelProvider id={props.route.params?.id}>
    <DetailSongContent {...props} />
  </ViewModelProvider>
);
