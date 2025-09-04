import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { View } from "react-native-ui-lib";
import { AppContainerSafeArea } from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { E_QuizStackRoutes } from "@/quiz";
import { CardFragment } from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const QuizzesContent =
  ({}: RootStackScreenProps<E_QuizStackRoutes.QUIZZES>) => {
    const { cards, isFetching, handleRemoveItem, handleGoQuiz } =
      useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <View
          flex
          backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
          padding-16
        >
          <View row spread centerV width={"100%"}>
            <Text style={styles.title}>Quizzes</Text>

            <View
              backgroundColor={colorsLight.FILL_COUNTER_QUIZZES}
              paddingV-4
              paddingH-15
              br100
            >
              <Text style={styles.counterText}>{cards.length} Quizzes</Text>
            </View>
          </View>

          {isFetching ? (
            <ActivityIndicator color={colorsLight.PRIMARY_COLOR} />
          ) : (
            <View flex>
              {cards.length > 0 ? (
                cards.map((item, index: number) => (
                  <CardFragment
                    key={item.id}
                    item={item}
                    index={index}
                    removeItem={handleRemoveItem}
                    quantity={cards.length}
                    handleGoQuiz={handleGoQuiz}
                  />
                ))
              ) : (
                <View flex center>
                  <Text>No quizzes found</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 34,
  },
  counterText: {
    padding: 4,
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
  },
});

export const QuizzesScreen = (
  props: RootStackScreenProps<E_QuizStackRoutes.QUIZZES>,
) => (
  <ViewModelProvider>
    <QuizzesContent {...props} />
  </ViewModelProvider>
);
