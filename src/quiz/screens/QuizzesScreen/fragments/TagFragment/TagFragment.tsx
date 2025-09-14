import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { colorsLight } from "@/core/theme";
import { TagEntity } from "@/quiz/data/remote/entities/tagEntity";

interface props {
  tag: TagEntity;
}

export const TagFragment = ({ tag: { name, description, img } }: props) => {
  return (
    <View style={styles.marginB16}>
      <FastImage
        source={{
          uri: img,
        }}
        style={styles.resultsImage}
      />
      <Text style={styles.resultsTitle}>{name}</Text>
      <Text style={styles.resultsText} color={colorsLight.GRAY_03}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsTitle: {
    fontSize: 20,
    fontFamily: "Satoshi-Bold",
    alignSelf: "center",
    marginVertical: 28,
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
  marginB16: { marginBottom: 16 },
});
