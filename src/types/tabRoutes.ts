import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList, RootStackScreenProps} from '@/types/stackRoutes';

export enum TabsHomeRoutes {
  MATCH = 'MATCH',
  EXPLORER = 'EXPLORER',
  MESSAGES = 'MESSAGES',
  PROFILE = 'PROFILE',
}

export type TabsHomeParamList = {
  [TabsHomeRoutes.MATCH]: undefined;
  [TabsHomeRoutes.EXPLORER]: undefined;
  [TabsHomeRoutes.MESSAGES]: {channelId?: string};
  [TabsHomeRoutes.PROFILE]: undefined;
};

export type TabsHomeScreenProps<T extends keyof TabsHomeParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsHomeParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
