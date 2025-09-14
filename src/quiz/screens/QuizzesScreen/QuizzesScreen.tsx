import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "@react-native-material/core";
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
          style={[
            styles.container,
            { backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR },
          ]}
        >
          <View style={[styles.rowSpreadCenterV, styles.fullWidth]}>
            <Text style={styles.title}>Quizzes</Text>

            <View
              style={[
                styles.pillCounter,
                { backgroundColor: colorsLight.FILL_COUNTER_QUIZZES },
              ]}
            >
              <Text style={styles.counterText}>{cards.length} Quizzes</Text>
            </View>
          </View>

          {isFetching ? (
            <ActivityIndicator color={colorsLight.PRIMARY_COLOR} />
          ) : (
            <View style={styles.flex}>
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
                <View style={styles.flexCenter}>
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
  container: { flex: 1, padding: 16 },
  rowSpreadCenterV: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullWidth: { width: "100%" },
  title: {
    fontFamily: "Satoshi-Bold",
    fontSize: 34,
  },
  counterText: {
    padding: 4,
    fontFamily: "Satoshi-Bold",
    fontSize: 12,
  },
  pillCounter: { paddingVertical: 4, paddingHorizontal: 15, borderRadius: 100 },
  flex: { flex: 1 },
  flexCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export const QuizzesScreen = (
  props: RootStackScreenProps<E_QuizStackRoutes.QUIZZES>,
) => (
  <ViewModelProvider>
    <QuizzesContent {...props} />
  </ViewModelProvider>
);
