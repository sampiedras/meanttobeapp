import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from "react-native-permissions";
import { requestTrackingPermission } from "react-native-tracking-transparency";
import {
  selectUser,
  setPermissionAppTrackingTransparencyLocal,
  setPermissionLocation,
  setPermissionLocationLocal,
  setPermissionNotification,
  setPermissionNotificationLocal,
} from "../slices/userSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const usePermissions = () => {
  const dispatch = useAppDispatch();
  const {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
    permissionAppTrackingTransparencyLocal,
  } = useAppSelector(selectUser);

  const handleRequestPermissionLocation = async () => {
    try {
      if (Platform.OS === "android") {
        const resultRequestPermissionLocation = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        await dispatch(setPermissionLocationLocal(true));
        return (
          resultRequestPermissionLocation === RESULTS.GRANTED ||
          resultRequestPermissionLocation === RESULTS.LIMITED ||
          resultRequestPermissionLocation === RESULTS.UNAVAILABLE
        );
      } else {
        const resultRequestPermissionLocation = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        await dispatch(setPermissionLocationLocal(true));
        return (
          resultRequestPermissionLocation === RESULTS.GRANTED ||
          resultRequestPermissionLocation === RESULTS.LIMITED ||
          resultRequestPermissionLocation === RESULTS.UNAVAILABLE
        );
      }
    } catch (error) {
      return false;
    }
  };

  const handleRequestPermissionNotification = async () => {
    const { status } = await requestNotifications(["alert", "sound"]);
    await dispatch(setPermissionNotificationLocal(true));
    return (
      status === RESULTS.GRANTED ||
      status === RESULTS.LIMITED ||
      status === RESULTS.UNAVAILABLE
    );
  };

  const handleRequestTrackingPermission = async () => {
    try {
      await requestTrackingPermission();
      await dispatch(setPermissionAppTrackingTransparencyLocal(true));
    } catch (error) {
      // TODO: Handle error
    }
  };

  const handleCheckPermissionLocation = useCallback(async () => {
    if (Platform.OS === "android") {
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
  }, [dispatch]);

  const handleCheckPermissionNotification = useCallback(async () => {
    const { status } = await checkNotifications();
    const permissionStatusNotifications =
      status === RESULTS.GRANTED ||
      status === RESULTS.LIMITED ||
      status === RESULTS.UNAVAILABLE;
    dispatch(setPermissionNotification(permissionStatusNotifications));
  }, [dispatch]);

  const checkPermission = useCallback(async () => {
    await handleCheckPermissionLocation();
    await handleCheckPermissionNotification();
    const permissionLocationLocalString = await AsyncStorage.getItem(
      "permissionLocationLocal",
    );
    const permissionNotificationLocalString = await AsyncStorage.getItem(
      "permissionNotificationLocal",
    );
    const permissionAppTrackingTransparencyLocalString =
      await AsyncStorage.getItem("permissionAppTrackingTransparencyLocal");

    const asyncPermissionLocationLocal = permissionLocationLocalString
      ? JSON.parse(permissionLocationLocalString)
      : false;
    const asyncPermissionNotificationLocal = permissionNotificationLocalString
      ? JSON.parse(permissionNotificationLocalString)
      : false;

    const asyncPermissionAppTrackingTransparencyLocal =
      permissionAppTrackingTransparencyLocalString
        ? JSON.parse(permissionAppTrackingTransparencyLocalString)
        : false;

    await dispatch(setPermissionLocationLocal(asyncPermissionLocationLocal));
    await dispatch(
      setPermissionNotificationLocal(asyncPermissionNotificationLocal),
    );
    await dispatch(
      setPermissionAppTrackingTransparencyLocal(
        asyncPermissionAppTrackingTransparencyLocal,
      ),
    );
  }, [
    dispatch,
    handleCheckPermissionLocation,
    handleCheckPermissionNotification,
  ]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    permissionLocation,
    permissionNotification,
    permissionLocationLocal,
    permissionNotificationLocal,
    permissionAppTrackingTransparencyLocal,
    checkPermission,
    handleRequestPermissionLocation,
    handleRequestPermissionNotification,
    handleRequestTrackingPermission,
  };
};
