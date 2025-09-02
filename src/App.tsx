import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Qonversion, {
  Environment,
  LaunchMode,
  QonversionConfigBuilder,
} from "react-native-qonversion";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Assets } from "react-native-ui-lib";
import { Provider } from "react-redux";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-react-native";
import { StackNavigation } from "@/navigation/stackNavigation";
import awsExports from "./aws-exports";
import { Loading, TutorialMatch } from "./components";
import { ItsMatch } from "./components/ItsMatch";
import { AuthProvider } from "./context/AuthContext";
import store from "./libraries/redux";
import { NotificationProvider } from "./providers/NotificationProvider";
import { GET_STREAM_API_KEY, QONVERSION_API_KEY } from "./utils/config";

Assets.loadAssetsGroup("icons", {
  WELCOME_PEOPLE_ICON: require("./assets/image/welcome_people_icon.png"),
});

// Configure Amplify
Amplify.configure(awsExports);

const client = StreamChat.getInstance(GET_STREAM_API_KEY);

const App = () => {
  // const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const config = new QonversionConfigBuilder(
      QONVERSION_API_KEY,
      LaunchMode.SUBSCRIPTION_MANAGEMENT,
    )
      .setEnvironment(Environment.SANDBOX)
      .setEntitlementsUpdateListener({
        onEntitlementsUpdated(entitlements) {
          const entitlement = entitlements.get("premium_access");
        },
      })
      .build();
    Qonversion.initialize(config);
    Qonversion.getSharedInstance().syncHistoricalData();
    Qonversion.getSharedInstance().syncStoreKit2Purchases();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <StatusBar
          animated={true}
          backgroundColor="#FFFF"
          barStyle="dark-content"
          showHideTransition="fade"
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NotificationProvider>
            <BottomSheetModalProvider>
              <OverlayProvider>
                <Chat client={client}>
                  <NavigationContainer>
                    <StackNavigation />
                    <Loading />
                    <ItsMatch />
                    <TutorialMatch />
                  </NavigationContainer>
                </Chat>
              </OverlayProvider>
            </BottomSheetModalProvider>
          </NotificationProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </Provider>
  );
};

export default App;
