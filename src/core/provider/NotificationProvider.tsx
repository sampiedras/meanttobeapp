import React, { createContext, useContext, useEffect, useRef } from "react";
// import { Platform } from "react-native";
// import notifee, {
//   AndroidImportance,
//   AndroidVisibility,
//   EventType,
//   Notification,
// } from '@notifee/react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/useRedux";
import { setChannelId, setShow } from "../slices/matchSlice";

type NotificationContextType = {
  setCurrentChannelId: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const currentChannelIdRef = useRef<string>("");

  const setCurrentChannelId = (id: string) => {
    currentChannelIdRef.current = id;
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (message: any) => {
      // const channelId = await notifee.createChannel({
      //   id: "default",
      //   name: "Default Channel",
      // });

      if (
        message.data?.channel_id !== currentChannelIdRef.current &&
        message.notification?.title !== "It’s a Match!"
      ) {
        // const bodyNotification: Notification = {
        //   title: message.notification?.title,
        //   body: message.notification?.body,
        //   data: message.data,
        //   android: {
        //     channelId,
        //     sound: "default",
        //     importance: AndroidImportance.HIGH,
        //     visibility: AndroidVisibility.PUBLIC,
        //   },
        // };
        // notifee.displayNotification(bodyNotification);
      } else if (message.notification?.title === "It’s a Match!") {
        dispatch(setChannelId(message?.data?.channel_id || ""));
        dispatch(setShow(true));
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // return notifee.onForegroundEvent(({type, detail}: any) => {
    //   console.log(
    //     '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈',
    //     JSON.stringify(detail),
    //   );
    //   switch (type) {
    //     case EventType.DISMISSED:
    //       break;
    //     case EventType.PRESS:
    //       if (detail?.notification?.title !== 'It’s a Match!') {
    //         const channelId =
    //           Platform.OS === 'ios'
    //             ? detail.notification?.data?.stream?.channel_id
    //             : detail.notification?.data?.channel_id;
    //         navigate(E_ChatStackRoutes.CHAT, {
    //           channelId: channelId || '',
    //         });
    //       }
    //       break;
    //   }
    // });
    // const unsubscribe = notifee.onForegroundEvent(
    //   async ({ type, detail }: any) => {
    //     const channelId =
    //       Platform.OS === "ios"
    //         ? detail.notification?.data?.stream?.channel_id
    //         : detail.notification?.data?.channel_id;
    //     if (
    //       type === EventType.PRESS &&
    //       navigationRef.current?.isReady() // Verifica que la navegación esté lista
    //     ) {
    //       if (detail?.notification?.title !== "It’s a Match!") {
    //         navigate(E_ChatStackRoutes.CHAT, { channelId: channelId || "" });
    //       }
    //     } else if (
    //       type === EventType.PRESS &&
    //       !navigationRef.current?.isReady()
    //     ) {
    //       if (detail?.notification?.title !== "It’s a Match!") {
    //         await AsyncStorage.setItem("PUSH_NOTIFICATION_MESSAGE", channelId);
    //       } else {
    //         await AsyncStorage.setItem(
    //           "PUSH_NOTIFICATION_MATCH",
    //           detail?.notification?.data?.channel_id
    //         );
    //       }
    //     }
    //   }
    // );
    // messaging().onNotificationOpenedApp((message) => {
    //   console.log(
    //     "message 💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩💩",
    //     message
    //   );
    // });
    // return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContext.Provider value={{ setCurrentChannelId }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotificationProvider() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("Notification Provider");
  }
  return context;
}
