import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import { DetailQuizScreen, QuizzesScreen } from ".";

export enum E_QuizStackRoutes {
  QUIZZES = "QUIZZES",
  DETAIL_QUIZ = "DETAIL_QUIZ",
}

export const useQuizGroupScreens = () => {
  return useMemo(() => {
    const QuizGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_QuizStackRoutes.DETAIL_QUIZ}
          component={DetailQuizScreen}
          options={({ navigation }) => ({
            title: "Start",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Satoshi-Medium",
              color: colorsLight.PRIMARY_TEXT_COLOR,
              fontSize: 18,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon style={styles.marginIcon} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_QuizStackRoutes.QUIZZES}
          component={QuizzesScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.rowCenter}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    QuizGroupScreens.displayName = "QuizGroupScreens";
    return QuizGroupScreens;
  }, []);
};

const styles = StyleSheet.create({
  marginIcon: {
    marginLeft: 10,
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
});
