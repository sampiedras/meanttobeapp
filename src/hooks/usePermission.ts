import {useEffect} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {useAppDispatch, useAppSelector} from './useRedux';
import {
  selectUser,
  setPermissionAppTrackingTransparencyLocal,
  setPermissionLocation,
  setPermissionLocationLocal,
  setPermissionNotification,
  setPermissionNotificationLocal,
} from '@/slices/userSlice';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

export const usePermission = () => {
  const dispatch = useAppDispatch();
  const {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
    permissionAppTrackingTransparencyLocal,
  } = useAppSelector(selectUser);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    await handleCheckPermissionLocation();
    await handleCheckPermissionNotification();
  };

  const handleCheckPermissionLocation = async () => {
    if (Platform.OS === 'android') {
      const resultRequestPermissionLocation = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      const permissionStatusLocation =
        resultRequestPermissionLocation === RESULTS.GRANTED ||
        resultRequestPermissionLocation === RESULTS.LIMITED ||
        resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
      dispatch(setPermissionLocation(permissionStatusLocation));
    } else {
      const resultRequestPermissionLocation = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      const permissionStatusLocation =
        resultRequestPermissionLocation === RESULTS.GRANTED ||
        resultRequestPermissionLocation === RESULTS.LIMITED ||
        resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
      dispatch(setPermissionLocation(permissionStatusLocation));
    }
  };

  const handleCheckPermissionNotification = async () => {
    if (Platform.OS === 'android') {
      const resultRequestPermissionNotifications = await check(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      const permissionStatusNotifications =
        resultRequestPermissionNotifications === RESULTS.GRANTED ||
        resultRequestPermissionNotifications === RESULTS.LIMITED ||
        resultRequestPermissionNotifications === RESULTS.UNAVAILABLE;
      dispatch(setPermissionNotification(permissionStatusNotifications));
    } else {
      const authStatus = await messaging().hasPermission();
      const permissionStatusNotifications =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      dispatch(setPermissionNotification(permissionStatusNotifications));
    }
  };

  const handleRequestPermissionLocation = async () => {
    if (Platform.OS === 'android') {
      const resultRequestPermissionLocation = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      const permissionStatusLocation =
        resultRequestPermissionLocation === RESULTS.GRANTED ||
        resultRequestPermissionLocation === RESULTS.LIMITED ||
        resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
      await dispatch(setPermissionLocationLocal(true));
      dispatch(setPermissionLocation(permissionStatusLocation));
    } else {
      const resultRequestPermissionLocation = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      const permissionStatusLocation =
        resultRequestPermissionLocation === RESULTS.GRANTED ||
        resultRequestPermissionLocation === RESULTS.LIMITED ||
        resultRequestPermissionLocation === RESULTS.UNAVAILABLE;
      await dispatch(setPermissionLocationLocal(true));
      dispatch(setPermissionLocation(permissionStatusLocation));
    }
  };

  const handleRequestPermissionNotification = async () => {
    if (Platform.OS === 'android') {
      const resultRequestPermissionNotifications = await request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      const permissionStatusNotifications =
        resultRequestPermissionNotifications === RESULTS.GRANTED ||
        resultRequestPermissionNotifications === RESULTS.LIMITED ||
        resultRequestPermissionNotifications === RESULTS.UNAVAILABLE;
      await dispatch(setPermissionNotificationLocal(true));
      dispatch(setPermissionNotification(permissionStatusNotifications));
    } else {
      const authStatus = await messaging().requestPermission();
      const permissionStatusNotifications =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      await dispatch(setPermissionNotificationLocal(true));
      dispatch(setPermissionNotification(permissionStatusNotifications));
    }
  };

  const handleRequestTrackingPermission = async () => {
    return new Promise<void>(async resolve => {
      try {
        await requestTrackingPermission();
        await dispatch(setPermissionAppTrackingTransparencyLocal(true));
        resolve();
      } catch (error) {
        resolve();
      }
    });
  };

  return {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
    permissionAppTrackingTransparencyLocal,
    handleRequestPermissionLocation,
    handleRequestPermissionNotification,
    handleRequestTrackingPermission,
  };
};
