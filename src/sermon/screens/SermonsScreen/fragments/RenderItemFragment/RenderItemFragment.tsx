import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { format, parseISO } from "date-fns";
import FastImage from "react-native-fast-image";
import { colorsLight } from "@/core/theme";
import { ISermonResponse } from "@/sermon/data/remote/entities/sermonEntity";
import { HartActiveIcon, HartGrayIcon } from "@/song/assets/svg";
import { useActionsRenderItemFragment } from "./useActionsRenderItemFragment";

interface Props {
  item: ISermonResponse;
  handleNavigateDetail: (id: string) => void;
}

export const RenderItemFragment = ({ item, handleNavigateDetail }: Props) => {
  const { like, handleToggleLike } = useActionsRenderItemFragment(
    item.id || "",
    item.isLike || false,
  );

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const getYouTubeThumbnailUrl = (videoId: string | null) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` || "";
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigateDetail(item.id)}
    >
      <View style={styles.headContent} width="100%">
        <FastImage
          source={{
            uri:
              getYouTubeThumbnailUrl(getYouTubeVideoId(item.urlYouTube)) || "",
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
        />
        <View style={styles.shadow} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleToggleLike}>
            {like ? (
              <HartActiveIcon width={20} height={20} />
            ) : (
              <HartGrayIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title} variant="body2" color={colorsLight.BLACK}>
        {item.title}
      </Text>
      <Text
        style={styles.textCreationDate}
        variant="caption"
        color={colorsLight.BLACK}
        numberOfLines={2}
      >
        {format(parseISO(item.creationDate), "MMMM dd yyyy") || ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: "100%",
    borderColor: colorsLight.GRAY_02,
    marginVertical: 12,
  },
  headContent: {
    borderRadius: 16,
    height: 160,
  },
  title: {
    marginVertical: 8,
    fontFamily: "Satoshi-Bold",
  },
  textCreationDate: {
    fontFamily: "Satoshi-Regular",
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  iconContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 8,
    top: 8,
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 16,
  },
});
