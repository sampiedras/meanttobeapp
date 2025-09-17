import React, { useMemo } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { ArrowBackIcon } from "@/core/assets/svg";
import { Stack } from "@/core/navigation";
import {
  AddPhotoScreen,
  ChurchScreen,
  CompleteAccountScreen,
  CompleteProfileScreen,
  DrivesScreen,
  QuestionsScreen,
  StoryScreen,
} from "./screens";

export enum E_UserStackRoutes {
  COMPLETE_ACCOUNT = "COMPLETE_ACCOUNT",
  STORY = "STORY",
  DRIVES = "DRIVES",
  QUESTIONS = "QUESTIONS",
  COMPLETE_PROFILE = "COMPLETE_PROFILE",
  CHURCH = "CHURCH",
  ADD_PHOTO = "ADD_PHOTO",
}

export const useUserGroupScreens = () => {
  return useMemo(() => {
    const UserGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_UserStackRoutes.COMPLETE_ACCOUNT}
          component={CompleteAccountScreen}
          options={() => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
      </Stack.Group>
    );

    UserGroupScreens.displayName = "UserGroupScreens";
    return UserGroupScreens;
  }, []);
};

export const useUserAuthGroupScreens = () => {
  return useMemo(() => {
    const UserAuthGroupScreens = () => (
      <Stack.Group>
        <Stack.Screen
          name={E_UserStackRoutes.STORY}
          component={StoryScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_UserStackRoutes.DRIVES}
          component={DrivesScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_UserStackRoutes.QUESTIONS}
          component={QuestionsScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_UserStackRoutes.COMPLETE_PROFILE}
          component={CompleteProfileScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_UserStackRoutes.CHURCH}
          component={ChurchScreen}
          options={({ navigation }) => ({
            title: "",
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: Platform.OS === "ios" ? 18 : 6,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.goBack}>
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={E_UserStackRoutes.ADD_PHOTO}
          component={AddPhotoScreen}
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
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowBackIcon />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Group>
    );

    UserAuthGroupScreens.displayName = "UserAuthGroupScreens";
    return UserAuthGroupScreens;
  }, []);
};
