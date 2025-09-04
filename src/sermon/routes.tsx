import React, { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import { DetailSermonScreen, SermonsScreen } from ".";

export enum E_SermonStackRoutes {
  SERMONS = "SERMONS",
  DETAIL_SERMON = "DETAIL_SERMON",
}

export const useSermonGroupScreens = () => {
  return useMemo(() => {
    const SermonGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_SermonStackRoutes.DETAIL_SERMON}
          component={DetailSermonScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_SermonStackRoutes.SERMONS}
          component={SermonsScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
                <Text style={styles.text}>Feed</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    SermonGroupScreens.displayName = "SermonGroupScreens";
    return SermonGroupScreens;
  }, []);
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
});
