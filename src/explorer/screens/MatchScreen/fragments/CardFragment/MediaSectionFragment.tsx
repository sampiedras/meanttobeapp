import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import { View } from "react-native-ui-lib";
import { PigeonIcon } from "@/explorer/assets/svg";
import { UserMatchType } from "@/user/data/remote/entities/userEntity";
import { useGetQuestionByUserIdQuery } from "@/user/data/remote/userApi";

interface MediaSectionFragmentProps {
  item: UserMatchType;
}

export const MediaSectionFragment = ({ item }: MediaSectionFragmentProps) => {
  const { data = [] } = useGetQuestionByUserIdQuery(item?.userId || "");

  return (
    <>
      {item.verse && (
        <View>
          <View>
            <View
              backgroundColor="#4E6B51"
              marginB-20
              padding-18
              style={styles.containerFirstQuestion}
            >
              <Text style={styles.textQuestionOne}>
                My favorite Bible verse is....
              </Text>
              <View style={styles.itemsQuestionContainer}>
                <Text style={styles.textAnswerOne}>{item.verse}</Text>
              </View>
              <View style={styles.pigeonIcon}>
                <PigeonIcon />
              </View>
            </View>
          </View>
        </View>
      )}

      {data.map((i, index) => (
        <View key={index}>
          {item?.mediaUrls &&
            item.mediaUrls.length > 0 &&
            item.mediaUrls[index] && (
              <FastImage
                source={{
                  uri: item.mediaUrls[index],
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
            )}
          <View>
            <View marginV-20 paddingH-18>
              <Text style={styles.titleQuestion}>{i?.question || ""}</Text>
              <View style={styles.itemsQuestionContainer}>
                <Text style={styles.textAnswer}>{i?.answer || ""}</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 500,
    borderRadius: 30,
  },
  titleQuestion: {
    fontFamily: "Satoshi-Regular",
    marginBottom: 10,
    color: "#607270",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.8,
  },
  textAnswer: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 20.8,
    fontFamily: "Satoshi-Regular",
    color: "#393842",
  },
  itemsQuestionContainer: {},
  textAnswerOne: {
    color: "#E9ECE9",
    fontSize: 24,
    fontWeight: "900",
    fontStyle: "normal",
    lineHeight: 28.8,
    fontFamily: "Satoshi-Regular",
  },
  textQuestionOne: {
    color: "#B5C1B6",
    fontSize: 14,
    marginBottom: 20,
  },
  pigeonIcon: {
    alignSelf: "flex-end",
  },
  containerFirstQuestion: {
    borderRadius: 30,
    justifyContent: "center",
  },
});
