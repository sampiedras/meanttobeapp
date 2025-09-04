import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackRoutes } from "@/auth/routes";
import { E_ChatStackRoutes } from "@/chat/routes";
import { E_ExplorerStackRoutes } from "@/explorer";
import { E_NewsStackRoutes } from "@/news";
import { E_QuizStackRoutes } from "@/quiz";
import { E_SermonStackRoutes } from "@/sermon";
import { S_SettingsStackRoutes } from "@/settings";
import { E_SongStackRoutes } from "@/song";
import { E_UserStackRoutes } from "@/user";
import { E_VerseStackRoutes } from "@/verse";

export enum E_RootStackRoutes {
  TABS_HOME = "TABS_HOME",
  UI_KIT = "UI_KIT",
  PERMISSION = "PERMISSION",
}

export type RootStackParamList = {
  // Auth Routers
  [AuthStackRoutes.WELCOME]: undefined;
  [AuthStackRoutes.LOGIN_EMAIL]: undefined;
  [AuthStackRoutes.LOGIN_PHONE]: undefined;
  [AuthStackRoutes.CONFIRM]: {
    destination?: string;
    username: string;
    type: "email" | "phone";
  };
  [E_UserStackRoutes.COMPLETE_ACCOUNT]: undefined;
  [E_UserStackRoutes.STORY]: undefined;
  [E_UserStackRoutes.DRIVES]: undefined;
  [E_UserStackRoutes.QUESTIONS]: undefined;
  [E_UserStackRoutes.COMPLETE_PROFILE]: undefined;
  [E_UserStackRoutes.CHURCH]: undefined;
  [E_UserStackRoutes.ADD_PHOTO]: undefined;
  [E_RootStackRoutes.PERMISSION]: undefined;
  [E_RootStackRoutes.TABS_HOME]: NavigatorScreenParams<TabParamList>;

  [S_SettingsStackRoutes.SETTINGS]: undefined;
  [S_SettingsStackRoutes.EDIT_PROFILE]: undefined;
  [S_SettingsStackRoutes.NOTIFICATION]: undefined;
  [S_SettingsStackRoutes.NEW_MESSAGE_SCREEN]: {
    title: string;
  };

  [E_SongStackRoutes.SONGS]: undefined;
  [E_SongStackRoutes.DETAIL_SONG]: { id: string };
  [E_SongStackRoutes.DETAIL_ARTIST]: { id: string };
  [E_SongStackRoutes.DETAIL_SONG_GENRE]: { id: string };

  [E_SermonStackRoutes.SERMONS]: undefined;
  [E_SermonStackRoutes.DETAIL_SERMON]: { id: string };

  [E_NewsStackRoutes.NEWS]: undefined;

  [E_QuizStackRoutes.QUIZZES]: undefined;
  [E_QuizStackRoutes.DETAIL_QUIZ]: { id: string; quizName: string };

  [E_VerseStackRoutes.VERSES]: { id: string };
  [E_VerseStackRoutes.VERSES_LIST]: { id: string };
  [E_VerseStackRoutes.DETAIL_VERSE]: { id: string };
  [E_ChatStackRoutes.CHAT]: { channelId: string };
};

export type TabParamList = {
  [E_ExplorerStackRoutes.EXPLORER]: undefined;
  [E_ExplorerStackRoutes.MATCH]: undefined;
  [E_ExplorerStackRoutes.MESSAGES]: undefined;
  [E_ExplorerStackRoutes.PROFILE]: undefined;
};

export type TabsHomeScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
