import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useGetVerseReferenceByIdQuery } from "@/core/data/remote/bibleApi";
import { colorsLight } from "@/core/theme";
import { IVerseResponse } from "@/verse/data/remote/entities/verseEntity";
import { useFindVerseByIdQuery } from "@/verse/data/remote/verseApi";
import { E_VerseStackRoutes } from "@/verse/routes";

interface Props {
  item: IVerseResponse;
}

export const RenderItemsVerseFragment = ({ item }: Props) => {
  const [imgVerse, setImgVerse] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setImgVerse(item?.img);
  }, [item?.img]);

  const { data: verseData } = useFindVerseByIdQuery(item?.id || "");

  const { data: verseReference } = useGetVerseReferenceByIdQuery(
    verseData?.verseQuote.split("&")[0] || "",
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(E_VerseStackRoutes.DETAIL_VERSE, {
          id: item.id,
          //   reference: verseReference?.reference || '',
          //   text: item?.verseQuote.split('&')[1],
          //   img: item.shareImg,
        })
      }
    >
      <View
        style={[
          styles.cardContainer,
          styles.fullWidth,
          styles.marginB24,
          styles.paddingH20,
          styles.paddingV32,
        ]}
      >
        <FastImage
          style={styles.image}
          source={{ uri: imgVerse || "", priority: FastImage.priority.normal }}
        />
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.verseQuote}>{verseReference?.reference}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colorsLight.BORDER_GRAY_COLOR,
    borderRadius: 16,
  },
  fullWidth: { width: "100%" },
  marginB24: { marginBottom: 24 },
  paddingH20: { paddingHorizontal: 20 },
  paddingV32: { paddingVertical: 32 },
  title: {
    color: "black",
    fontSize: 20,
    fontFamily: "Satoshi-Black",
    lineHeight: 24,
    marginVertical: 16,
  },
  verseQuote: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
    lineHeight: 28.0,
  },
  image: {
    width: "100%",
    height: 155,
    borderRadius: 24,
  },
});
