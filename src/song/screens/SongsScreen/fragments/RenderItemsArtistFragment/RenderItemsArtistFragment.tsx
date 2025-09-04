import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { TouchableOpacity, View } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { IArtistResponse } from "@/song/data/remote/entities/artistEntity";
import { E_SongStackRoutes } from "@/song/routes";
import { useViewModelProvider } from "../../ViewModelContext";

interface Props {
  item: IArtistResponse;
}

export const RenderItemsArtistFragment = ({ item }: Props) => {
  const { nameToSearch } = useViewModelProvider();
  const navigation = useNavigation();
  const [imgArtist, setImgArtist] = useState("");

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const randomBorderColor = getRandomColor();

  const handleNavigateToArtist = () => {
    navigation.navigate(E_SongStackRoutes.DETAIL_ARTIST, {
      id: item.id,
    });
  };

  useEffect(() => {
    const signedURL = item.img;
    setImgArtist(signedURL);
  }, [item?.img]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToArtist}>
      <View center style={styles.containerItem}>
        <FastImage
          style={[styles.img, { borderColor: randomBorderColor }]}
          source={{
            uri: imgArtist || "",
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {nameToSearch && (
          <Text
            variant="body2"
            color={colorsLight.PRIMARY_TEXT_COLOR}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.text}
          >
            {item.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  containerItem: {
    alignItems: "center",
  },
  img: {
    height: 72,
    width: 72,
    borderRadius: 72,
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    width: 80,
    textAlign: "center",
    marginTop: 14,
    fontFamily: "Satoshi-Medium",
  },
});
