import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
import {
  AppContainerSafeArea,
  AppViewPagerProgressBar,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_QuizStackRoutes } from "@/quiz";
import { QuizQuestionType } from "@/quiz/data/remote/entities/quiestionEntity";
import { CardFragment, TagFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const DetailQuizContent = ({
  route: {
    params: { quizName },
  },
}: RootStackScreenProps<E_QuizStackRoutes.DETAIL_QUIZ>) => {
  const { count, cards, current, tags, removeItem } = useViewModelProvider();

  return (
    <AppContainerSafeArea>
      {count > 0 ? (
        <View style={styles.container}>
          <Text style={styles.counter} color={colorsLight.GRAY_03}>
            {current + " / " + count}
          </Text>

          <View style={styles.marginV12}>
            <AppViewPagerProgressBar
              progress={{
                position: current,
                offset: 0,
              }}
              numberOfPages={count + 1}
            />
          </View>

          {count === current ? (
            <View style={styles.flexMarginT16}>
              <FlatList
                data={tags}
                style={styles.list}
                renderItem={({ item }) => <TagFragment tag={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.flex}>
              <Text style={styles.title}>{quizName}</Text>
              {cards.map((item: QuizQuestionType, index: number) => {
                return (
                  <CardFragment
                    key={item.id}
                    item={item}
                    index={index}
                    removeItem={removeItem}
                    quantity={count}
                  />
                );
              })}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.flexCenterMarginV16}>
          <Text style={styles.resultsText}>No questions found</Text>
        </View>
      )}
    </AppContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  list: {
    flex: 1,
    borderRadius: 24,
  },
  counter: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
  },
  marginV12: { marginVertical: 12 },
  flexMarginT16: { flex: 1, marginTop: 16 },
  flex: { flex: 1 },
  title: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Satoshi-Medium",
  },
  resultsText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    textAlign: "center",
  },
  flexCenterMarginV16: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
});

export const DetailQuizScreen = (
  props: RootStackScreenProps<E_QuizStackRoutes.DETAIL_QUIZ>,
) => (
  <ViewModelProvider
    id={props.route.params.id}
    quizName={props.route.params.quizName}
  >
    <DetailQuizContent {...props} />
  </ViewModelProvider>
);
