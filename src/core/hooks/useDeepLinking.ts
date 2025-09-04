import { Linking } from "react-native";
import { LinkingOptions } from "@react-navigation/native";
import { AuthStackRoutes } from "@/auth/routes";
import { RootStackParamList } from "../types/StackRoutes";
import { APP_SCHEMA } from "../utils/config";

export const useDeepLinking = () => {
  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [
      `${APP_SCHEMA}://`,
      "https://app.adjust.com/",
      "https://voyako.go.link/",
    ],
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      return url;
    },
    subscribe(listener) {
      const linkingSubscription = Linking.addEventListener("url", ({ url }) => {
        listener(url);
      });

      return () => {
        linkingSubscription.remove();
      };
    },
    config: {
      initialRouteName: AuthStackRoutes.WELCOME,
      screens: {
        WELCOME: {
          path: AuthStackRoutes.WELCOME,
        },
      },
    },
  };

  return {
    linking,
  };
};
