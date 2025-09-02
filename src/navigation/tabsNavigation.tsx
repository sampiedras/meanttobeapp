import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ExplorerScreen,
  MatchScreen,
  MessagesScreen,
  ProfileScreen,
} from "@/screens";
import { TabsHomeParamList, TabsHomeRoutes } from "@/types/tabRoutes";
import { CustomTabBar } from "./CustomTabBar";

const Tab = createBottomTabNavigator<TabsHomeParamList>();

export function TabsNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={TabsHomeRoutes.MATCH}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name={TabsHomeRoutes.MATCH} component={MatchScreen} />
      <Tab.Screen name={TabsHomeRoutes.EXPLORER} component={ExplorerScreen} />
      <Tab.Screen name={TabsHomeRoutes.MESSAGES} component={MessagesScreen} />
      <Tab.Screen name={TabsHomeRoutes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
