import React from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@react-native-material/core";
import { colorsLight } from "@/core/theme";
import { QuizQuestionType } from "@/quiz/data/remote/entities/quiestionEntity";
import { QuizAnswersType } from "@/quiz/data/remote/entities/quizEntity";
import { useActionsCard } from "./useActionsCard";

interface Props {
  item: QuizQuestionType;
  index: number;
  quantity: number;
  removeItem: (tagId: string) => void;
}

const RenderAnswer = ({
  item,
  handlePress,
}: {
  item: QuizAnswersType;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.answer} onPress={handlePress}>
      <Text style={styles.answerText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export const CardFragment = ({ item, index, removeItem, quantity }: Props) => {
  const { answers, rotate, pan, changeQuestion } = useActionsCard(
    removeItem,
    item.id,
  );

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          opacity: quantity - index,
          zIndex: quantity - index,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animateContainer,
          {
            transform: [{ translateX: pan.current.x }, { rotate: rotate }],
            marginTop: index * 40,
          },
        ]}
      >
        <View
          style={[
            styles.item,
            styles.padding16,
            styles.height90,
            styles.centerH,
            { backgroundColor: colorsLight.FILL_QUIZZES_QUESTION_CARD },
          ]}
        >
          <Text color={colorsLight.WHITE} style={styles.questionText}>
            {item.name}
          </Text>
          {answers.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={styles.answerList}
              data={answers}
              renderItem={({ item: itemAnswer }) => (
                <RenderAnswer
                  item={itemAnswer}
                  handlePress={() => changeQuestion(itemAnswer.tagId)}
                />
              )}
            />
          ) : (
            <View style={styles.centerFlex}>
              <Text style={styles.questionText} color={colorsLight.WHITE}>
                No options found
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colorsLight.GRAY_BR,
  },
  padding16: { padding: 16 },
  height90: { height: "90%" },
  centerH: { alignItems: "center" },
  animateContainer: {
    width: "90%",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerFlex: { flex: 1, alignItems: "center", justifyContent: "center" },
  answerList: {
    marginTop: 16,
    width: "100%",
  },
  answer: {
    backgroundColor: colorsLight.WHITE,
    width: "100%",
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  answerText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
  },
  questionText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
  },
});
