import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { E_ExplorerStackRoutes, useExplorerGroupScreens } from "@/explorer";
import { TabParamList } from "../types/StackRoutes";
import { CustomTabBar } from "./CustomTabBar";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigation() {
  const renderExplorerGroupScreens = useExplorerGroupScreens();

  return (
    <Tab.Navigator
      initialRouteName={E_ExplorerStackRoutes.MATCH}
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      {renderExplorerGroupScreens()}
    </Tab.Navigator>
  );
}
