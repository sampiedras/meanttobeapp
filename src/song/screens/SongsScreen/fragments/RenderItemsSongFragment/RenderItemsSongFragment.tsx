import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { colorsLight } from "@/core/theme";
import { ISongResponse } from "@/song/data/remote/entities/songEntity";
import { E_SongStackRoutes } from "@/song/routes";

interface Props {
  item: ISongResponse;
}

export const RenderItemsSongFragment = ({ item }: Props) => {
  const [imgSongs, setImgSong] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const signedURL = item?.img;
    setImgSong(signedURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(E_SongStackRoutes.DETAIL_SONG, {
          id: item.id,
        })
      }
    >
      <View style={[styles.row, styles.containerSong]}>
        <View style={[styles.row, styles.content]}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
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
  containerSong: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});
