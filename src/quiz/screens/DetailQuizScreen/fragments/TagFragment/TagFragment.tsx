import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { colorsLight } from "@/core/theme";
import { TagEntity } from "@/quiz/data/remote/entities/tagEntity";

interface props {
  tag: TagEntity;
}

export const TagFragment = ({ tag }: props) => {
  return (
    <View style={styles.marginB8}>
      <FastImage
        source={{
          uri: tag.img,
        }}
        style={styles.resultsImage}
      />
      <Text style={styles.resultsTitle}>{tag.name}</Text>
      <Text style={styles.resultsText} color={colorsLight.GRAY_03}>
        {tag.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsTitle: {
    fontSize: 20,
    fontFamily: "Satoshi-Bold",
    alignSelf: "center",
    marginVertical: 32,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    textAlign: "center",
  },
  resultsImage: {
    height: 273,
    width: "100%",
    borderRadius: 24,
  },
  marginB8: { marginBottom: 8 },
});
