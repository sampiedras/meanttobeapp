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

export const RenderItemSongFragment = ({ item }: Props) => {
  const navigation = useNavigation();
  const [like, setLike] = useState<boolean | undefined>(item?.isLike);

  const [createSongLike] = useCreateSongLikeMutation();
  const [deleteSongLike] = useDeleteSongLikeMutation();

  const handleToggleLike = useCallback(async () => {
    setLike((prevLike) => {
      const newLike = !prevLike;

      if (newLike) {
        createSongLike({ songLikeId: item.id })
          .unwrap()
          .catch(() => setLike(!prevLike));
      } else {
        deleteSongLike(item.id)
          .unwrap()
          .catch(() => setLike(!prevLike));
      }

      return newLike;
    });
  }, [createSongLike, deleteSongLike, item.id]);

  useEffect(() => {
    setLike(item?.isLike);
  }, [item?.isLike]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(E_SongStackRoutes.DETAIL_SONG, {
            id: item.id,
          })
        }
      >
        <View row style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: item?.img || "",
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View row flex style={styles.containerItems}>
            <View>
              <Text numberOfLines={2} style={styles.textSong}>
                {item.name}
              </Text>
              <Text style={styles.textArtist}>{item?.artist?.name}</Text>
            </View>
            <TouchableOpacity onPress={handleToggleLike}>
              {like ? <HartActiveIcon /> : <HartGrayIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <View
        height={0.5}
        width="100%"
        backgroundColor={colorsLight.GRAY_04}
        style={styles.crossBar}
        marginV-20
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: colorsLight.GRAY_02,
  },
  content: {
    marginVertical: 10,
    alignItems: "center",
    rowGap: 40,
  },
  textSong: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Satoshi-Normal",
    marginBottom: 8,
    maxWidth: 200,
  },
  textArtist: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    color: colorsLight.GRAY_03,
  },
  containerItems: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  crossBar: { alignSelf: "center", borderRadius: 20 },
});
