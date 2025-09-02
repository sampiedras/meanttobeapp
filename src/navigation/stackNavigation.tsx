/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from "react";
import { Platform, Share, StatusBar, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { enableScreens } from "react-native-screens";
import { View } from "react-native-ui-lib";
import { ArrowBackIcon } from "@/assets/svg";
import { useAuthProvider } from "@/context/AuthContext";
import { usePermission } from "@/hooks/usePermission";
import {
  AddPhotoScreen,
  ChatScreen,
  ChurchScreen,
  CompleteAccountScreen,
  CompleteProfileScreen,
  ContactProfileScreen,
  DetailArtistScreen,
  DetailSongScreen,
  DrivesScreen,
  EditProfileScreen,
  GeneralNotificationsScreen,
  LoginEmailScreen,
  LoginPhoneScreen,
  NewsScreen,
  NotificationsScreen,
  PermissionScreen,
  QuestionsScreen,
  QuizQuestionsScreen,
  QuizzesScreen,
  SearchScreen,
  SermonDetailScreen,
  SermonsScreen,
  SettingsScreen,
  SongGenreDetailScreen,
  SongsScreen,
  StoryScreen,
  TutorialScreen,
  VerifyCodeScreen,
  VersesDetailScreen,
  VersesListScreen,
  VersesScreen,
  WelcomeScreen,
} from "@/screens";
import { colorsLight } from "@/theme/colorsLight";
import { RootStackParamList, RootStackRoutes } from "@/types/stackRoutes";
import { TabsNavigation } from "./tabsNavigation";

enableScreens();
const Stack = createStackNavigator<RootStackParamList>();

export function StackNavigation() {
  const {
    isLoading,
    isAuthenticated,
    user,
    handleSendUserLocation,
    handleSendUserTokenFirebase,
  } = useAuthProvider();
  const {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
    permissionAppTrackingTransparencyLocal,
  } = usePermission();

  useEffect(() => {
    if (isAuthenticated && permissionLocation) {
      handleSendUserLocation();
    }

    if (isAuthenticated && permissionNotification) {
      handleSendUserTokenFirebase();
    }
  }, [isAuthenticated, permissionLocation, permissionNotification]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <StatusBar
          animated={true}
          backgroundColor="#FFFFFF"
          barStyle="dark-content"
          showHideTransition="fade"
        />
        <LottieView
          source={require("../assets/animated/splash.json")}
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
        />
      </View>
    );
  }

  const mandatoryScreen = () => {
    if (
      isAuthenticated &&
      user?.person &&
      user?.person?.name &&
      (!permissionLocationLocal ||
        !permissionNotificationLocal ||
        (Platform.OS === "ios" && !permissionAppTrackingTransparencyLocal))
    ) {
      return (
        <Stack.Screen
          name={RootStackRoutes.PERMISSION}
          component={PermissionScreen}
          options={{ headerShown: false }}
        />
      );
    }

    return null;
  };

  return (
    <Stack.Navigator>
      {mandatoryScreen() || (
        <>
          {isAuthenticated ? (
            user?.person && user?.person?.name ? (
              <Stack.Screen
                name={RootStackRoutes.TABS_HOME}
                component={TabsNavigation}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name={RootStackRoutes.COMPLETE_ACCOUNT}
                component={CompleteAccountScreen}
                options={{
                  headerShown: false,
                }}
              />
            )
          ) : (
            <>
              <Stack.Screen
                name={RootStackRoutes.WELCOME}
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={RootStackRoutes.LOGIN_EMAIL}
                component={LoginEmailScreen}
                options={({ navigation }) => ({
                  title: "Login or sign up",
                  headerShadowVisible: false,
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: "Satoshi-Medium",
                    fontSize: 16,
                    color: colorsLight.PRIMARY_TEXT_COLOR,
                  },
                  headerLeftContainerStyle: {
                    paddingLeft: 8,
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                      <ArrowBackIcon />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name={RootStackRoutes.LOGIN_PHONE}
                component={LoginPhoneScreen}
                options={({ navigation }) => ({
                  title: "Login with phone",
                  headerShadowVisible: false,
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: "Satoshi-Medium",
                    fontSize: 16,
                    color: colorsLight.PRIMARY_TEXT_COLOR,
                  },
                  headerLeftContainerStyle: {
                    paddingLeft: 8,
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                      <ArrowBackIcon />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name={RootStackRoutes.VERIFY_CODE}
                component={VerifyCodeScreen}
                options={({ navigation }) => ({
                  title: "",
                  headerShadowVisible: false,
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontSize: 16,
                    color: colorsLight.PRIMARY_TEXT_COLOR,
                  },
                  headerLeftContainerStyle: {
                    paddingLeft: 8,
                  },
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.pop()}>
                      <ArrowBackIcon />
                    </TouchableOpacity>
                  ),
                })}
              />
            </>
          )}
        </>
      )}
      <Stack.Screen
        name={RootStackRoutes.COMPLETE_PROFILE}
        component={CompleteProfileScreen}
        options={({ navigation }) => ({
          title: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.DRIVES}
        component={DrivesScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.ADD_PHOTO}
        component={AddPhotoScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.QUESTIONS}
        component={QuestionsScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.CHURCH}
        component={ChurchScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SETTINGS}
        component={SettingsScreen}
        options={({ navigation }) => ({
          title: "Settings",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.BLACK,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.NOTIFICATIONS}
        component={NotificationsScreen}
        options={({ navigation }) => ({
          title: "Notification",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.BLACK,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.GENERAL_NOTIFICATIONS}
        component={GeneralNotificationsScreen}
        options={({ route, navigation }) => ({
          title: route.params.title,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.EDIT_PROFILE}
        component={EditProfileScreen}
        options={({ navigation }) => ({
          title: "User profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 17,
            color: colorsLight.PRIMARY_TEXT_COLOR,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SONGS}
        component={SongsScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.VERSES}
        component={VersesScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.VERSES_LIST}
        component={VersesListScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerLeftContainerStyle: {
            paddingHorizontal: Platform.OS === "ios" ? 12 : 0,
          },
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.VERSES_DETAIL}
        component={VersesDetailScreen}
        options={({ navigation, route }) => ({
          headerTitle: "Verse detail",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            fontSize: 18,
            color: colorsLight.BLACK,
          },
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 12 : 8,
          },
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SERMONS}
        component={SermonsScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.NEWS}
        component={NewsScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.QUIZZES}
        component={QuizzesScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.QUIZ_QUESTIONS}
        component={QuizQuestionsScreen}
        options={({ navigation }) => ({
          headerTitle: "Start",
          headerTitleStyle: {
            fontFamily: "Satoshi-Medium",
            color: colorsLight.PRIMARY_TEXT_COLOR,
            fontSize: 18,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Feed",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerRightContainerStyle: {
            paddingRight: Platform.OS === "ios" ? 18 : 6,
          },
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SONG_GENRE_DETAIL}
        component={SongGenreDetailScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "Genres",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: true,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SERMON_DETAIL}
        component={SermonDetailScreen}
        options={({ navigation, route }) => ({
          title: "Details",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Bold",
            fontSize: 17,
            color: colorsLight.BLACK,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  title: route.params.title,
                  url: route.params.urlYouTube,
                  message: `${
                    Platform.OS === "ios"
                      ? route.params.title
                      : `${route.params.urlYouTube}`
                  }\n\n${
                    Platform.OS === "ios"
                      ? "https://apps.apple.com/co/app/meant-to-be/id6463029847"
                      : "https://play.google.com/store/apps/details?id=com.meanttobe&pli=1"
                  }`,
                });
              }}
            >
              <Text
                color={colorsLight.PRIMARY_COLOR}
                style={{
                  fontSize: 17,
                  fontFamily: "Satoshi-Medium",
                  marginRight: 16,
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.ARTIST_DETAIL}
        component={DetailArtistScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerShown: false,
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SONG_DETAIL}
        component={DetailSongScreen}
        options={({ navigation, route }) => ({
          title: "Details",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Satoshi-Bold",
            fontSize: 17,
            color: colorsLight.BLACK,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  title: route.params.name,
                  url: route.params.ulrSong,
                  message: `${
                    Platform.OS === "ios"
                      ? route.params.name
                      : `${route.params.ulrSong}`
                  }\n\n${
                    Platform.OS === "ios"
                      ? "https://apps.apple.com/co/app/meant-to-be/id6463029847"
                      : "https://play.google.com/store/apps/details?id=com.meanttobe&pli=1"
                  }`,
                });
              }}
            >
              <Text
                color={colorsLight.PRIMARY_COLOR}
                style={{
                  fontSize: 17,
                  fontFamily: "Satoshi-Medium",
                  marginRight: Platform.OS === "ios" ? 18 : 16,
                }}
              >
                Share
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.SEARCH}
        component={SearchScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerShown: false,
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
          presentation: "modal",
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.STORY}
        component={StoryScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
          },
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.CHAT}
        component={ChatScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.CONTACT_PROFILE}
        component={ContactProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={RootStackRoutes.TUTORIAL_SCREEN}
        component={TutorialScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerTintColor: colorsLight.SECONDARY_TEXT_COLOR,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: Platform.OS === "ios" ? 18 : 6,
          },
          headerShown: false,
          headerBackImage: () => (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <ArrowBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
