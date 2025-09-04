import React, { useMemo } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import {
  EditProfileScreen,
  NewMessageScreen,
  NotificationScreen,
  SettingsScreen,
} from "./screens";

export enum S_SettingsStackRoutes {
  SETTINGS = "SETTINGS",
  EDIT_PROFILE = "EDIT_PROFILE",
  NOTIFICATION = "NOTIFICATION",
  NEW_MESSAGE_SCREEN = "NEW_MESSAGE_SCREEN",
}

export const useSettingsGroupScreens = () => {
  return useMemo(() => {
    const SettingsGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={S_SettingsStackRoutes.SETTINGS}
          component={SettingsScreen}
          options={({ navigation }) => ({
            title: "Settings",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginRight: 12,
            },
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 12 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={S_SettingsStackRoutes.EDIT_PROFILE}
          component={EditProfileScreen}
          options={({ navigation }) => ({
            title: "User Profile",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginRight: 12,
            },
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 12 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={S_SettingsStackRoutes.NOTIFICATION}
          component={NotificationScreen}
          options={({ navigation }) => ({
            title: "Notification",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginRight: 12,
            },
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 12 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={S_SettingsStackRoutes.NEW_MESSAGE_SCREEN}
          component={NewMessageScreen}
          options={({ navigation }) => ({
            title: "New Message",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              marginRight: 12,
            },
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 12 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack} row centerV>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    SettingsGroupScreens.displayName = "SettingsGroupScreens";
    return SettingsGroupScreens;
  }, []);
};
