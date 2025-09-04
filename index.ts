import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Amplify } from "aws-amplify";
import { registerRootComponent } from "expo";
import { Application } from "@/App";
import "react-native-gesture-handler";
import "@/core/translate";
import { awsmobile } from "./src/aws-exports";

Amplify.configure(awsmobile);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const channelId = remoteMessage?.data?.channel_id as string;

  if (remoteMessage?.notification?.title !== "It’s a Match!") {
    await AsyncStorage.setItem("PUSH_NOTIFICATION_MESSAGE", channelId ?? "");
  } else {
    await AsyncStorage.setItem("PUSH_NOTIFICATION_MATCH", channelId ?? "");
  }
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Application);
