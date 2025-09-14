import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import { format, parseISO } from "date-fns";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import FastImage from "react-native-fast-image";
import YoutubePlayer from "react-native-youtube-iframe";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_SermonStackRoutes } from "@/sermon";
import { PlayIcon } from "@/song/assets/svg";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailSermonContent =
  ({}: RootStackScreenProps<E_SermonStackRoutes.DETAIL_SERMON>) => {
    const {
      data,
      videoId,
      playing,
      imageUrl,
      isFetching,
      handlePress,
      onStateChange,
    } = useViewModelProvider();

    return (
      <SafeAreaView style={styles.container}>
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
          <ScrollView style={styles.containerScroll}>
            <View style={styles.marginT36}>
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
                    <PlayIcon style={styles.iconPlay} width={30} height={30} />
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
              {data?.title}
            </Text>
            <Text color={colorsLight.GREEN} style={styles.textCreationDate}>
              {format(parseISO(data?.creationDate || ""), "MMMM dd yyyy")}
            </Text>
            <View
              style={[styles.fullWidth, styles.divider, styles.marginV28]}
            />
            <Text
              color={colorsLight.SECONDARY_TEXT_COLOR}
              style={styles.description}
            >
              {data?.description}
            </Text>
          </ScrollView>
        )}
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
  marginT36: { marginTop: 36 },
  image: {
    flex: 1,
    borderRadius: 16,
    width: "100%",
    height: 200,
  },
  containerVideo: {
    borderRadius: 16,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontFamily: "Satoshi-Medium",
    marginVertical: 16,
  },
  textCreationDate: {
    fontFamily: "Satoshi-Regular",
    fontSize: 16,
  },
  description: {
    fontFamily: "Satoshi-Regular",
  },
  fullWidth: { width: "100%" },
  divider: { height: 1, backgroundColor: colorsLight.GRAY_DIVIDER },
  marginV28: { marginVertical: 28 },
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
  },
  containerSkeleton: {
    flex: 1,
    alignItems: "center",
  },
});

export const DetailSermonScreen = (
  props: RootStackScreenProps<E_SermonStackRoutes.DETAIL_SERMON>,
) => (
  <ViewModelProvider id={props.route.params.id}>
    <DetailSermonContent {...props} />
  </ViewModelProvider>
);
