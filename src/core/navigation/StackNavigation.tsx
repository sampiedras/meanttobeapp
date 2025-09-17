import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { enableScreens } from "react-native-screens";
import { AuthStackRoutes, useAuthGroupScreens } from "@/auth/routes";
import { useChatGroupScreens } from "@/chat";
import { useNewsGroupScreens } from "@/news";
import { useQuizGroupScreens } from "@/quiz";
import { useSermonGroupScreens } from "@/sermon";
import { useSettingsGroupScreens } from "@/settings";
import { useSongGroupScreens } from "@/song";
import {
  E_UserStackRoutes,
  PermissionScreen,
  useUserAuthGroupScreens,
  useUserGroupScreens,
} from "@/user";
import { useVerseGroupScreens } from "@/verse";
import { useAuthProvider } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import { colorsBase } from "../theme";
import { E_RootStackRoutes } from "../types/StackRoutes";
import { Stack } from ".";
import { TabNavigation } from "./TabNavigation";

enableScreens();

export function StackNavigation() {
  const { isLoading, isAuthenticated, isUserComplete, userProfile } =
    useAuthProvider();
  const {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
  } = usePermissions();

  console.log('userProfileuserProfile', userProfile)
  const { renderAuthGroupScreens } = useAuthGroupScreens();
  const renderUserGroupScreens = useUserGroupScreens();
  const renderUserAuthGroupScreens = useUserAuthGroupScreens();
  const renderSongGroupScreens = useSongGroupScreens();
  const renderSermonGroupScreens = useSermonGroupScreens();
  const renderSettingsGroupScreen = useSettingsGroupScreens();
  const renderQuizGroupScreens = useQuizGroupScreens();
  const renderNewsGroupScreens = useNewsGroupScreens();
  const renderVerseGroupScreens = useVerseGroupScreens();
  const renderChatGroupScreens = useChatGroupScreens();

  const mandatoryScreen = () => {
    if (
      isAuthenticated &&
      userProfile?.name &&
      (!permissionLocation ||
        !permissionNotification ||
        !permissionLocationLocal ||
        !permissionNotificationLocal)
    ) {
      return (
        <Stack.Screen
          name={E_RootStackRoutes.PERMISSION}
          component={PermissionScreen}
          options={{ headerShown: false }}
        />
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor: colorsBase.WHITE }]}
        testID="loading-animation"
      >
        <StatusBar
          animated={true}
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          showHideTransition="fade"
        />
        <LottieView
          source={require("../assets/json/lotties/splash_voyako.json")}
          style={styles.icon}
          autoPlay
          loop
        />
      </View>
    );
  }

  const hasMandatoryScreen =
    isAuthenticated &&
    userProfile?.name &&
    (!permissionLocation ||
      !permissionNotification ||
      !permissionLocationLocal ||
      !permissionNotificationLocal);

  return (
    <Stack.Navigator
      initialRouteName={
        hasMandatoryScreen
          ? E_RootStackRoutes.PERMISSION
          : isAuthenticated
            ? isUserComplete
              ? E_RootStackRoutes.TABS_HOME
              : E_UserStackRoutes.COMPLETE_ACCOUNT
            : AuthStackRoutes.WELCOME
      }
    >
      {mandatoryScreen() ||
        (isAuthenticated ? (
          isUserComplete ? (
            <>
              <Stack.Screen
                name={E_RootStackRoutes.TABS_HOME}
                component={TabNavigation}
                options={{ headerShown: false }}
              />
              {renderSongGroupScreens()}
              {renderSermonGroupScreens()}
              {renderQuizGroupScreens()}
              {renderNewsGroupScreens()}
              {renderVerseGroupScreens()}
              {renderChatGroupScreens()}
              {renderSettingsGroupScreen()}
              {renderUserAuthGroupScreens()}
            </>
          ) : (
            renderUserGroupScreens()
          )
        ) : (
          renderAuthGroupScreens()
        ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  icon: { width: 160, height: 160 },
});
