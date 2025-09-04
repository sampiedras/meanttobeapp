import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { HartActiveIcon, HartGrayIcon } from "@/song/assets/svg";
import { ISongResponse } from "@/song/data/remote/entities/songEntity";
import {
  useCreateSongLikeMutation,
  useDeleteSongLikeMutation,
} from "@/song/data/remote/songApi";
import { E_SongStackRoutes } from "@/song/routes";

interface Props {
  item: ISongResponse;
}

export const RenderItemsSongFragment = ({ item }: Props) => {
  const navigation = useNavigation();
  const [imgSongs, setImgSong] = useState("");
  const [like, setLike] = useState(item.isLike);

  const [createSongLike] = useCreateSongLikeMutation();
  const [deleteSongLike] = useDeleteSongLikeMutation();

  const handleToggleLike = useCallback(async () => {
    setLike((prevLike) => {
      const newLike = !prevLike;

      if (newLike) {
        createSongLike({ songLikeId: item.id })
          .unwrap()
          .catch(() => setLike(newLike));
      } else {
        deleteSongLike(item.id)
          .unwrap()
          .catch(() => setLike(newLike));
      }

      return newLike;
    });
  }, [createSongLike, deleteSongLike, item.id]);

  useEffect(() => {
    setLike(item?.isLike);
  }, [item?.isLike]);

  useEffect(() => {
    const signedURL = item?.img;
    setImgSong(signedURL);
  }, [item?.img]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(E_SongStackRoutes.DETAIL_SONG, {
          id: item.id,
        })
      }
    >
      <View row style={styles.containerSongAndLogoHeart}>
        <View row style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: imgSongs || "",
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.textSong}
            >
              {item.name}
            </Text>
            <Text style={styles.textArtist}>{item?.artist?.name}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleToggleLike}>
            {like ? <HartActiveIcon /> : <HartGrayIcon />}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 75,
    borderRadius: 16,
    marginRight: 10,
  },
  content: {
    marginVertical: 8,
    alignItems: "center",
    rowGap: 40,
  },
  textSong: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Satoshi-Normal",
    marginBottom: 5,
    maxWidth: 200,
  },
  textArtist: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    color: colorsLight.GRAY_03,
  },
  containerSongAndLogoHeart: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
