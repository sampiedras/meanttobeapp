import React, { useMemo } from "react";
import { Tab } from "@/core/navigation";
import {
  ExplorerScreen,
  MatchScreen,
  MessageScreen,
  ProfileScreen,
} from "./screens";

export enum E_ExplorerStackRoutes {
  MATCH = "MATCH",
  EXPLORER = "EXPLORER",
  MESSAGES = "MESSAGES",
  PROFILE = "PROFILE",
}

export const useExplorerGroupScreens = () => {
  return useMemo(() => {
    const ExplorerGroupScreens = () => (
      <Tab.Group>
        <Tab.Screen
          name={E_ExplorerStackRoutes.MATCH}
          component={MatchScreen}
          options={() => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
        <Tab.Screen
          name={E_ExplorerStackRoutes.EXPLORER}
          component={ExplorerScreen}
          options={() => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
        <Tab.Screen
          name={E_ExplorerStackRoutes.MESSAGES}
          component={MessageScreen}
          options={() => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
        <Tab.Screen
          name={E_ExplorerStackRoutes.PROFILE}
          component={ProfileScreen}
          options={() => ({
            headerShown: false,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "red",
            },
          })}
        />
      </Tab.Group>
    );

    ExplorerGroupScreens.displayName = "ExplorerGroupScreens";
    return ExplorerGroupScreens;
  }, []);
};
