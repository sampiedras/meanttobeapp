import React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { colorsLight } from "@/core/theme";
import { INewsResponse } from "@/news/data/remote/entities/newsEntity";

interface props {
  newData: INewsResponse;
}

export const CardFragment = ({ newData }: props) => {
  const { name, information, mediaUrls, newsUrl, typeNews } = newData;

  const handleGoToDetail = async (url: string) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleGoToDetail(newsUrl)}
    >
      <View style={[styles.headContent, styles.h193, styles.w100]}>
        <View
          style={[
            styles.category,
            styles.absTR,
            styles.marginT16,
            styles.marginR16,
            styles.paddingH16,
            styles.paddingV4,
            styles.br100,
            { backgroundColor: colorsLight.WHITE },
          ]}
        >
          <Text color={colorsLight.PRIMARY_COLOR} numberOfLines={1}>
            {/* {newsCategory?.name.split('\n')[0]} */}
            {typeNews}
          </Text>
        </View>
        <FastImage source={{ uri: mediaUrls[0] }} style={styles.img} />
      </View>
      <View style={styles.padding16}>
        <Text style={styles.title} color={colorsLight.BLACK}>
          {name}
        </Text>
        <Text
          style={styles.textNew}
          color={colorsLight.BLACK}
          numberOfLines={2}
        >
          {information}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
    padding: 16,
    marginVertical: 16,
  },
  title: {
    width: "80%",
    fontSize: 14,
    fontFamily: "Satoshi-Black",
  },
  textNew: {
    marginTop: 16,
    fontSize: 12,
    fontFamily: "Satoshi-Regular",
  },
  headContent: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
  },
  category: {
    zIndex: 200,
  },
  absTR: { position: "absolute", top: 0, right: 0 },
  padding16: { padding: 16 },
  marginT16: { marginTop: 16 },
  marginR16: { marginRight: 16 },
  paddingH16: { paddingHorizontal: 16 },
  paddingV4: { paddingVertical: 4 },
  br100: { borderRadius: 100 },
  w100: { width: "100%" },
  h193: { height: 193 },
  img: {
    flex: 1,
  },
});
