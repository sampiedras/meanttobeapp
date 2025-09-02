import {useAuthProvider} from '@/context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {Alert, Platform} from 'react-native';

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {isAuthenticated, handleSendUserTokenFirebase} = useAuthProvider();

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (Platform.OS === 'ios') {
          const fcmTokenApns = await messaging().getAPNSToken();
          console.log('fcmTokenApns', fcmTokenApns);
          await messaging().setAPNSToken(fcmTokenApns || '');
          await handleSendUserTokenFirebase();
        } else {
          const fcmToken = await messaging().getToken();
          console.log('fcmToken', fcmToken);
          await handleSendUserTokenFirebase();
        }
      } catch (error) {
        // TODO: handle error
        console.log(
          '$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',
          error,
        );
      }
    };

    const registerDevice = async () => {
      await messaging()
        .registerDeviceForRemoteMessages()
        .catch(err => {
          // TODO: handle error
        });
    };

    const initNotification = async () => {
      messaging().onNotificationOpenedApp(messageNotification => {
        console.log('messageNotification', messageNotification);
      });
    };

    const loadInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
      console.log('initialNotification', initialNotification);
    };

    let unsubscribe;
    if (isAuthenticated) {
      Promise.all([
        registerDevice(),
        checkToken(),
        initNotification(),
        loadInitialNotification(),
      ]);
      unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

      return unsubscribe;
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};
