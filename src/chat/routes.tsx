import React, { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { TouchableOpacity } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import { colorsLight } from "@/core/theme";
import { ChatScreen } from ".";

export enum E_ChatStackRoutes {
  CHAT = "CHAT",
}

export const useChatGroupScreens = () => {
  return useMemo(() => {
    const ChatGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_ChatStackRoutes.CHAT}
          component={ChatScreen}
          options={({ navigation }) => ({
            headerShown: false,
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

    ChatGroupScreens.displayName = "ChatGroupScreens";
    return ChatGroupScreens;
  }, []);
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Satoshi-Bold",
    fontSize: 14,
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
});
