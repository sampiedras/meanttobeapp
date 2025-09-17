import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { Text } from "@react-native-material/core";
import * as Sentry from "@sentry/react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PermissionLocationIcon,
  PermissionNotificationIcon,
} from "@/core/assets/svg";
import { AppGradientButton } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { usePermissions } from "@/core/hooks/usePermissions";
import { colorsLight } from "@/core/theme";
import {
  E_RootStackRoutes,
  RootStackScreenProps,
} from "@/core/types/StackRoutes";
import { useUpdateUserPermissionsMutation } from "@/user/data/remote/userApi";

export const PermissionScreen =
  ({}: RootStackScreenProps<E_RootStackRoutes.PERMISSION>) => {
    const { handleCompleteProfile } = useAuthProvider();

    const {
      permissionLocation,
      permissionLocationLocal,
      permissionAppTrackingTransparencyLocal,
      permissionNotificationLocal,
      handleRequestPermissionLocation,
      handleRequestPermissionNotification,
      handleRequestTrackingPermission,
      checkPermission,
    } = usePermissions();
    const [handleUpdateUserPermissions] = useUpdateUserPermissionsMutation();

    const [currentPermissionStep, setCurrentPermissionStep] = useState(0);

    const handlePermissionLocation = useCallback(async () => {
      const resultPermission = await handleRequestPermissionLocation();
      if (resultPermission) {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              await handleUpdateUserPermissions({
                location: { latitude, longitude },
              }).unwrap();
            } catch (errorResponse) {
              Alert.alert("Error", "Error to update location");
            }
          },
          (Error: any) => {
            console.log(
              "Error -> handlePermissionLocation",
              Error.code,
              Error.message,
            );
            Sentry.captureException(Error);
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
        );
      }
    }, [handleRequestPermissionLocation, handleUpdateUserPermissions]);

    const handlePermissionNotification = useCallback(async () => {
      console.log("entssasa");
      await handleRequestPermissionNotification();
      handleCompleteProfile();
      checkPermission();
    }, [
      checkPermission,
      handleCompleteProfile,
      handleRequestPermissionNotification,
    ]);

    const handleTrackingPermission = useCallback(async () => {
      try {
        await handleRequestTrackingPermission();
      } catch (error) {
        console.log("Not Permission Tracking");
      }
    }, [handleRequestTrackingPermission]);

    useEffect(() => {
      const checkPermissions = async () => {
        if (!permissionAppTrackingTransparencyLocal && Platform.OS === "ios") {
          setCurrentPermissionStep(2);
        } else if (!permissionLocationLocal || !permissionLocation) {
          setCurrentPermissionStep(4);
        } else if (!permissionNotificationLocal) {
          setCurrentPermissionStep(5);
        }
      };

      checkPermissions();
    }, [
      permissionAppTrackingTransparencyLocal,
      permissionLocation,
      permissionLocationLocal,
      permissionNotificationLocal,
    ]);

    const renderPermissionStep = () => {
      switch (currentPermissionStep) {
        case 2:
          return (
            <View style={[styles.flex1, styles.paddingH16]}>
              <Text style={styles.title}>
                This app uses tracking to enhance your experience. Can you allow
                tracking for personalized recommendations?
              </Text>
              <View style={[styles.flex1, styles.center]}>
                <PermissionNotificationIcon />
              </View>
              <AppGradientButton
                label="Next"
                style={styles.button}
                onPress={async () => {
                  await handleTrackingPermission();
                  setCurrentPermissionStep(4);
                }}
              />
            </View>
          );
        case 4:
          return (
            <View style={[styles.flex1, styles.paddingH16]}>
              <Text style={styles.title}>
                Would you like to share your location to personalize your
                experience?
              </Text>
              <View style={[styles.flex1, styles.center]}>
                <PermissionLocationIcon />
              </View>
              <AppGradientButton
                label="Next"
                style={styles.button}
                onPress={async () => {
                  await handlePermissionLocation();
                  await checkPermission();
                  setCurrentPermissionStep(5);
                }}
              />
            </View>
          );
        case 5:
          return (
            <View style={[styles.flex1, styles.paddingH16]}>
              <Text style={styles.title}>
                Enabling notifications allows us to give you a personalized
                experience and helps keep you informed of everything going on in
              </Text>
              <View style={[styles.flex1, styles.center]}>
                <PermissionNotificationIcon />
              </View>
              <AppGradientButton
                label="Next"
                style={styles.button}
                onPress={async () => {
                  await handlePermissionNotification();
                  setCurrentPermissionStep(6);
                }}
              />
            </View>
          );
        default:
          return null;
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        {renderPermissionStep()}
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: { flex: 1 },
  paddingH16: { paddingHorizontal: 16 },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Satoshi-Medium",
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
  },
  center: { alignItems: "center", justifyContent: "center" },
});
