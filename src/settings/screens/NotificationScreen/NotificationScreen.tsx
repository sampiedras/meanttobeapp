import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
// import {FlatList} from 'react-native-gesture-handler';
import { Switch, View } from "react-native-ui-lib";
import { AppContainerSafeArea } from "@/core/components";
// import {generalOptions} from '@/core/fakeDb/generalOptions';
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { S_SettingsStackRoutes } from "@/settings/routes";
// import {OptionsRouteFragment} from './fragments';
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const NotificationContent =
  ({}: RootStackScreenProps<S_SettingsStackRoutes.NOTIFICATION>) => {
    const { enableNotifications, handleEnableNotifications } =
      useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <View
          backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
          paddingH-20
          flex
          centerH
        >
          <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.subtitle}>
            Choose what activities matter to you to keep in touch with.
          </Text>

          <View
            height={44}
            row
            spread
            width="100%"
            centerV
            marginB-36
            paddingH-8
          >
            <Text
              color={colorsLight.PRIMARY_TEXT_COLOR}
              style={styles.textEnableNotification}
            >
              Enable notification
            </Text>
            <Switch
              onColor={colorsLight.PRIMARY_COLOR}
              value={enableNotifications}
              onValueChange={handleEnableNotifications}
            />
          </View>

          {/* <View width="100%">
            <Text
              color={colorsLight.GRAY_03}
              style={styles.textGeneralNotification}>
              General notification
            </Text>

            <FlatList
              style={styles.routesContainer}
              data={generalOptions}
              renderItem={({item}) => (
                <OptionsRouteFragment title={item.title} />
              )}
              keyExtractor={item => item.title}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
            />
          </View> */}
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  subtitle: {
    textAlign: "center",
    width: "80%",
    fontSize: 14,
    marginTop: 36,
    marginBottom: 36,
    fontFamily: "Satoshi-Regular",
  },
  textEnableNotification: {
    fontFamily: "Satoshi-Medium",
    fontSize: 17,
  },
  // textGeneralNotification: {
  //   textAlign: 'left',
  //   fontSize: 16,
  //   marginBottom: 10,
  //   height: 22,
  //   fontFamily: 'Satoshi-Medium',
  // },
  // routesContainer: {
  //   paddingTop: 16,
  //   paddingHorizontal: 32,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: colorsLight.GRAY_02,
  // },
});

export const NotificationScreen = (
  props: RootStackScreenProps<S_SettingsStackRoutes.NOTIFICATION>,
) => (
  <ViewModelProvider>
    <NotificationContent {...props} />
  </ViewModelProvider>
);
