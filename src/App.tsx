import React, { useEffect, useRef } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { I18n } from "aws-amplify/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as RNLocalize from "react-native-localize";
import { MenuProvider } from "react-native-popup-menu";
import Qonversion, {
  Environment,
  LaunchMode,
  QonversionConfigBuilder,
} from "react-native-qonversion";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-react-native";
import { AppModalPremium, Loading } from "./core/components";
import { AppModalMatch } from "./core/components/AppModalMatch/AppModalMatch";
import { AuthProvider } from "./core/context/AuthContext";
import { useDeepLinking } from "./core/hooks/useDeepLinking";
import { persistor, store } from "./core/libraries/redux/index";
import { navigationRef, StackNavigation } from "./core/navigation";
import { NotificationProvider } from "./core/provider/NotificationProvider";
import { colorsDark, colorsLight } from "./core/theme";
// import {signOut} from 'aws-amplify/auth';
import { GET_STREAM_API_KEY, QONVERSION_API_KEY } from "./core/utils/config";

if (__DEV__) {
  import("../ReactotronConfig").then(() =>
    // eslint-disable-next-line no-console
    console.log("Reactotron Configured"),
  );
}

Sentry.init({
  dsn: "https://d7e80e04d23216d8654221290f6d2109@o4508292881907712.ingest.us.sentry.io/4508292886298624",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
});

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

const App = () => {
  const { bottom } = useSafeAreaInsets();

  const isDarkMode = useColorScheme() === "dark";
  const routerNameRef = useRef<string | undefined>(null);
  const { linking } = useDeepLinking();

  const setUserLanguage = () => {
    const userLang = RNLocalize.getLocales()[0].languageCode;
    I18n.setLanguage(userLang === "en" || userLang === "es" ? userLang : "en");
  };

  useEffect(() => {
    // signOut();

    const config = new QonversionConfigBuilder(
      QONVERSION_API_KEY,
      LaunchMode.SUBSCRIPTION_MANAGEMENT,
    )
      .setEnvironment(Environment.SANDBOX)
      .setEntitlementsUpdateListener({
        onEntitlementsUpdated(entitlements) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const entitlement = entitlements.get("premium_access");
          // console.log(
          //   '🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼🪼 ~ onEntitlementsUpdated ~ entitlement:',
          //   entitlement,
          // );
        },
      })
      .build();
    Qonversion.initialize(config);
    Qonversion.getSharedInstance().syncHistoricalData();
    Qonversion.getSharedInstance().syncStoreKit2Purchases();
    setUserLanguage();
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={
          isDarkMode
            ? colorsDark.BACKGROUND_SCREEN_COLOR
            : colorsLight.BACKGROUND_SCREEN_COLOR
        }
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        showHideTransition="fade"
      />
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <OverlayProvider bottomInset={bottom}>
            <Chat client={client}>
              <AuthProvider>
                <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    routerNameRef.current =
                      navigationRef?.getCurrentRoute()?.name;
                  }}
                  linking={linking}
                >
                  <NotificationProvider>
                    <StackNavigation />
                    <Loading />
                    <AppModalPremium />
                    <AppModalMatch />
                  </NotificationProvider>
                </NavigationContainer>
              </AuthProvider>
            </Chat>
          </OverlayProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
};

export default Sentry.wrap(App);

export const Application = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </PersistGate>
    </SafeAreaProvider>
  </Provider>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
