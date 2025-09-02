import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {LocalSvg} from 'react-native-svg';
import {GradientButton} from '@/components';
import {usePermission} from '@/hooks/usePermission';

export const PermissionScreen = () => {
  const {
    permissionLocationLocal,
    permissionAppTrackingTransparencyLocal,
    permissionNotificationLocal,
    handleRequestPermissionLocation,
    handleRequestPermissionNotification,
    handleRequestTrackingPermission,
  } = usePermission();

  const [currentPermissionStep, setCurrentPermissionStep] = useState(0);

  useEffect(() => {
    const checkPermissions = async () => {
      if (!permissionAppTrackingTransparencyLocal && Platform.OS === 'ios') {
        setCurrentPermissionStep(2);
      } else if (!permissionLocationLocal) {
        setCurrentPermissionStep(4);
      } else if (!permissionNotificationLocal) {
        setCurrentPermissionStep(5);
      }
    };

    checkPermissions();
  }, [
    permissionAppTrackingTransparencyLocal,
    permissionLocationLocal,
    permissionNotificationLocal,
  ]);

  const renderPermissionStep = () => {
    switch (currentPermissionStep) {
      case 2:
        return (
          <View flex-1 paddingH-16>
            <Text style={styles.title}>
              This app uses tracking to enhance your experience. Can you allow
              tracking for personalized recommendations?
            </Text>
            <View flex-1 center>
              <LocalSvg
                asset={require('../../assets/svg/permission_notification_icon.svg')}
              />
            </View>
            <GradientButton
              label="Next"
              style={styles.button}
              onPress={async () => {
                await handleRequestTrackingPermission();
                setCurrentPermissionStep(4);
              }}
            />
          </View>
        );
      case 4:
        return (
          <View flex-1 paddingH-16>
            <Text style={styles.title}>
              Would you like to share your location to personalize your
              experience?
            </Text>
            <View flex-1 center>
              <LocalSvg
                asset={require('../../assets/svg/permission_location_icon.svg')}
              />
            </View>
            <GradientButton
              label="Next"
              style={styles.button}
              onPress={async () => {
                await handleRequestPermissionLocation();
                setCurrentPermissionStep(5);
              }}
            />
          </View>
        );
      case 5:
        return (
          <View flex-1 paddingH-16>
            <Text style={styles.title}>
              Discover meaningful connections. Shall I enable your notifications
              for unique experiences?
            </Text>
            <View flex-1 center>
              <LocalSvg
                asset={require('../../assets/svg/permission_notification_icon.svg')}
              />
            </View>
            <GradientButton
              label="Next"
              style={styles.button}
              onPress={async () => {
                await handleRequestPermissionNotification();
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
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: 'center',
    marginTop: 24,
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
  titleMeantToBe: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlign: 'center',
    fontFamily: 'Satoshi-Black',
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
  },
});
