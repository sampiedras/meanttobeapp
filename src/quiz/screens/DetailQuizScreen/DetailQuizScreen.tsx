import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
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
        <View flex paddingH-16>
          <Text style={styles.counter} color={colorsLight.GRAY_03}>
            {current + " / " + count}
          </Text>

          <View marginV-12>
            <AppViewPagerProgressBar
              progress={{
                position: current,
                offset: 0,
              }}
              numberOfPages={count + 1}
            />
          </View>

          {count === current ? (
            <View flex marginT-16>
              <FlatList
                data={tags}
                style={styles.list}
                renderItem={({ item }) => <TagFragment tag={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View flex>
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
        <View flex center marginV-16>
          <Text style={styles.resultsText}>No questions found</Text>
        </View>
      )}
    </AppContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    borderRadius: 24,
  },
  counter: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "Satoshi-Bold",
  },
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
