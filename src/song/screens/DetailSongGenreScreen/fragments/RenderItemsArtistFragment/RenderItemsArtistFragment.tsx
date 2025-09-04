import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { View } from "react-native-ui-lib";
import { IArtistResponse } from "@/song/data/remote/entities/artistEntity";
import { E_SongStackRoutes } from "@/song/routes";

interface Props {
  item: IArtistResponse;
}

export const RenderItemsArtistFragment = ({ item }: Props) => {
  const navigation = useNavigation();
  const [imgArtist, setImgArtist] = useState("");

  useEffect(() => {
    const signedURL = item?.img;
    setImgArtist(signedURL);
  }, [item?.img]);

  const handleNavigateToArtist = () => {
    navigation.navigate(E_SongStackRoutes.DETAIL_ARTIST, {
      id: item.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToArtist}>
      <View center style={styles.itemContainer}>
        <FastImage
          style={styles.img}
          source={{
            uri: imgArtist || "",
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 8, // Espacio horizontal entre elementos
  },
  itemContainer: {
    alignItems: "center",
  },
  img: {
    height: 102,
    width: 102,
    borderRadius: 24,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    width: 100,
    textAlign: "center",
    marginVertical: 14,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    fontFamily: "Satoshi-Medium",
  },
});
