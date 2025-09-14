import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import FastImage from "react-native-fast-image";
import {
  ArrowRightWhiteIcon,
  HeartActiveIcon,
  HeartGrayIcon,
} from "@/core/assets/svg";
import { colorsLight } from "@/core/theme";
import { QuizEntity } from "@/quiz/data/remote/entities/quizEntity";
import { useActionsCard } from "./useActionsCard";

interface props {
  item: QuizEntity;
  index: number;
  quantity: number;
  removeItem: () => void;
  handleGoQuiz: (quiz: string, quizQuestionId: string) => void;
}

export const CardFragment = ({
  item,
  index,
  removeItem,
  quantity,
  handleGoQuiz,
}: props) => {
  const { like, pan, rotate, panResponder, handleToggleLike } = useActionsCard(
    item.id || "",
    item.isLike || false,
    removeItem,
  );

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          zIndex: quantity - index,
        },
      ]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            transform: [{ translateX: pan.current.x }, { rotate: rotate }],
            marginTop: index * 40,
          },
          styles.panHandler,
        ]}
      >
        <View
          style={[
            styles.item,
            styles.padding16,
            styles.height90,
            { backgroundColor: colorsLight.WHITE },
          ]}
        >
          <TouchableOpacity onPress={handleToggleLike} style={styles.heart}>
            {like ? <HeartActiveIcon /> : <HeartGrayIcon />}
          </TouchableOpacity>

          <FastImage
            source={{
              uri: item.img,
            }}
            resizeMode="cover"
            style={styles.image}
          />

          <Text style={styles.questionText}>{item.name}</Text>
          <Text style={styles.infoText} numberOfLines={3}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleGoQuiz(item.name, item.id)}
          >
            <ArrowRightWhiteIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: colorsLight.GRAY_BR,
    justifyContent: "space-evenly",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  panHandler: {
    width: "100%",
  },
  heart: {
    alignSelf: "flex-end",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 24,
  },
  questionText: {
    width: "80%",
    marginVertical: 16,
    fontSize: 20,
    fontFamily: "Satoshi-Black",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Satoshi-Regular",
    color: colorsLight.GRAY_03,
  },
  button: {
    marginVertical: 32,
    marginRight: 4,
    backgroundColor: colorsLight.PRIMARY_COLOR,
    borderRadius: 100,
    padding: 12,
    alignSelf: "flex-end",
  },
  padding16: { padding: 16 },
  height90: { height: "90%" },
});
