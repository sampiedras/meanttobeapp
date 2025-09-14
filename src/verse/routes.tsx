import React, { useMemo } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import { DetailVerseScreen, VerseListScreen, VersesScreen } from ".";

export enum E_VerseStackRoutes {
  VERSES = "VERSES",
  VERSES_LIST = "VERSES_LIST",
  DETAIL_VERSE = "DETAIL_VERSE",
}

export const useVerseGroupScreens = () => {
  return useMemo(() => {
    const VerseGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_VerseStackRoutes.DETAIL_VERSE}
          component={DetailVerseScreen}
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
                style={styles.rowCenterV}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_VerseStackRoutes.VERSES}
          component={VersesScreen}
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
                style={styles.rowCenterV}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_VerseStackRoutes.VERSES_LIST}
          component={VerseListScreen}
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
                style={styles.rowCenterV}
              >
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    VerseGroupScreens.displayName = "VerseGroupScreens";
    return VerseGroupScreens;
  }, []);
};

const styles = StyleSheet.create({
  rowCenterV: { flexDirection: "row", alignItems: "center" },
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
});
