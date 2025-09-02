import { NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { TabsHomeParamList } from "./tabRoutes";

export enum RootStackRoutes {
  LOGIN_EMAIL = "LOGIN_EMAIL",
  LOGIN_PHONE = "LOGIN_PHONE",
  VERIFY_CODE = "VERIFY_CODE",
  WELCOME = "WELCOME",
  TABS_HOME = "TABS_HOME",

  // Account routes
  COMPLETE_ACCOUNT = "COMPLETE_ACCOUNT",
  PROFILE = "PROFILE",
  COMPLETE_PROFILE = "COMPLETE_PROFILE",
  DRIVES = "DRIVES",
  ADD_PHOTO = "ADD_PHOTO",
  QUESTIONS = "QUESTIONS",
  CHURCH = "CHURCH",
  SETTINGS = "SETTINGS",
  NOTIFICATIONS = "NOTIFICATIONS",
  GENERAL_NOTIFICATIONS = "GENERAL_NOTIFICATIONS",
  EDIT_PROFILE = "EDIT_PROFILE",
  STORY = "STORY",

  // Permissions
  PERMISSION = "PERMISSION",

  // Explorer Screens
  SONGS = "SONGS",
  VERSES = "VERSES",
  VERSES_LIST = "VERSES_LIST",
  VERSES_DETAIL = "VERSES_DETAIL",
  SERMONS = "SERMONS",
  NEWS = "NEWS",
  SONG_GENRE_DETAIL = "SONG_GENRE_DETAIL",
  SERMON_DETAIL = "SERMON_DETAIL",
  ARTIST_DETAIL = "ARTIST_DETAIL",
  SONG_DETAIL = "SONG_DETAIL",
  QUIZZES = "QUIZZES",
  QUIZ_QUESTIONS = "QUIZ_QUESTIONS",
  SEARCH = "SEARCH",

  // Message Screens
  CHAT = "CHAT",
  CONTACT_PROFILE = "CONTACT_PROFILE",
  TUTORIAL_SCREEN = "TUTORIAL_SCREEN",
}

export type RootStackParamList = {
  [RootStackRoutes.LOGIN_EMAIL]: undefined;
  [RootStackRoutes.LOGIN_PHONE]: undefined;
  [RootStackRoutes.VERIFY_CODE]: {
    username: string;
    resultSignIn: any;
    lastScreen: string;
  };
  [RootStackRoutes.WELCOME]: undefined;
  [RootStackRoutes.COMPLETE_ACCOUNT]: undefined;
  [RootStackRoutes.COMPLETE_PROFILE]: undefined;
  [RootStackRoutes.DRIVES]: undefined;
  [RootStackRoutes.ADD_PHOTO]: undefined;
  [RootStackRoutes.QUESTIONS]: undefined;
  [RootStackRoutes.CHURCH]: undefined;
  [RootStackRoutes.SETTINGS]: undefined;
  [RootStackRoutes.NOTIFICATIONS]: undefined;
  [RootStackRoutes.GENERAL_NOTIFICATIONS]: {
    title: string;
  };
  [RootStackRoutes.EDIT_PROFILE]: undefined;

  [RootStackRoutes.TABS_HOME]: NavigatorScreenParams<TabsHomeParamList>;

  [RootStackRoutes.PERMISSION]: undefined;

  [RootStackRoutes.SONGS]: undefined;
  [RootStackRoutes.VERSES]: undefined;
  [RootStackRoutes.VERSES_LIST]: { id: string };
  [RootStackRoutes.VERSES_DETAIL]: {
    id: string;
  };
  [RootStackRoutes.SERMONS]: undefined;
  [RootStackRoutes.NEWS]: undefined;
  [RootStackRoutes.SONG_GENRE_DETAIL]: { id: string };
  [RootStackRoutes.SERMON_DETAIL]: {
    id: string;
  };
  [RootStackRoutes.ARTIST_DETAIL]: { id: string };
  [RootStackRoutes.SONG_DETAIL]: {
    id: string;
  };
  [RootStackRoutes.QUIZZES]: undefined;
  [RootStackRoutes.QUIZ_QUESTIONS]: {
    quiz: string;
    quizId: string;
  };

  [RootStackRoutes.SEARCH]: undefined;
  [RootStackRoutes.STORY]: undefined;

  [RootStackRoutes.CHAT]: {
    channelId: string;
  };
  [RootStackRoutes.CONTACT_PROFILE]: {
    channelId: string;
  };
  [RootStackRoutes.TUTORIAL_SCREEN]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
