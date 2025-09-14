import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { Tag } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { useViewModelProvider } from "../../ViewModelContext";

type RenderItemFragmentType = {
  item: {
    sk: string;
    name: string;

    // song
    image?: string;
    songUrl?: string;
    songGenderId?: string;
    artistId?: string;
    artist?: string;

    // Verse
    img?: string;
    shareImg?: string;
    verseQuote?: string;
    typeVerseId?: string;
    typeVerse?: string;

    // Sermon
    title?: string;
    description?: string;
    urlYouTube?: string;
    creationDate?: string;
    typeSermonId?: string;
    typeSermon?: string;

    // News
    information?: string;
    mediaUrls?: string[];
    typeNewsId?: string;
    newsUrl?: string;

    type: string;
  };
};

export const RenderItemFragment = ({ item }: RenderItemFragmentType) => {
  const { handleNavigate } = useViewModelProvider();

  const [image, setImage] = useState("");

  useEffect(() => {
    const getYouTubeThumbnailUrl = (url: string) => {
      const videoIdMatch = url.match(
        /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
      );

      if (videoIdMatch && videoIdMatch[1]) {
        setImage(
          `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`,
        );
      }
    };

    switch (item.type) {
      case "song":
        setImage(item?.img || "");
        break;
      case "verse":
        setImage(item?.img || "");
        break;
      case "sermon":
        getYouTubeThumbnailUrl(item?.urlYouTube || "");
        break;
      case "news":
        setImage(
          item && item?.mediaUrls && item?.mediaUrls?.length > 0
            ? item?.mediaUrls[0]
            : "",
        );
        break;

      default:
        break;
    }
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.containerImage}
      onPress={() =>
        handleNavigate(
          item.type,
          item.sk,
          item?.newsUrl || "",
          item?.name || "",
        )
      }
    >
      <FastImage
        source={{ uri: image && image, priority: FastImage.priority.normal }}
        style={styles.image}
      />
      <LinearGradient
        style={styles.shadowOverlay}
        colors={["rgba(0, 0, 0, 0.6)", "transparent"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.6 }}
      />
      <Tag
        title={item.type}
        width={90}
        height={32}
        colorTitle={colorsLight.PRIMARY_COLOR}
        backgroundColor={colorsLight.WHITE}
        style={styles.tag}
        fontFamily="Satoshi-Medium"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 4,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 16,
  },
  tag: {
    position: "absolute",
    bottom: 14,
    alignSelf: "flex-end",
    right: 14,
  },
  shadowOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    borderRadius: 16,
  },
});
