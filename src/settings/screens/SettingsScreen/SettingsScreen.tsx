import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native-ui-lib";
import {
  BellIcon,
  PrivacyIcon,
  TermsIcon,
  UserCircleGrayIcon,
} from "@/core/assets/svg";
import { AppContainerSafeArea, Button } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { S_SettingsStackRoutes } from "@/settings/routes";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const SettingsContent =
  ({}: RootStackScreenProps<S_SettingsStackRoutes.SETTINGS>) => {
    const { navigate } = useNavigation();
    const { handleLogout } = useAuthProvider();
    const { urlPrivacyPolicy, urlTermsOfService, handleGoToDetailUrl } =
      useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <View
          flex
          backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
          paddingH-20
        >
          <View paddingT-30 paddingB-48>
            <Text style={styles.title}>General</Text>
            <TouchableOpacity
              onPress={() => navigate(S_SettingsStackRoutes.EDIT_PROFILE)}
            >
              <View marginV-30 row style={styles.containerItems}>
                <Text style={styles.text}>User profile</Text>
                <UserCircleGrayIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate(S_SettingsStackRoutes.NOTIFICATION)}
            >
              <View row style={styles.containerItems}>
                <Text style={styles.text}>Notification</Text>
                <BellIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View flex>
            <Text style={styles.title}>Information</Text>
            {/* <View marginT-30 row style={styles.containerItems}>
           <Text style={styles.text}>About</Text>
           <LocalSvg asset={require('../../../assets/svg/version.svg')} />
         </View>
         <View row marginV-30 style={styles.containerItems}>
           <Text style={styles.text}>Version</Text>
           <LocalSvg asset={require('../../../assets/svg/versionTwo.svg')} />
         </View> */}
            <TouchableOpacity
              onPress={() => handleGoToDetailUrl(urlTermsOfService)}
            >
              <View marginB-30 marginT-30 row style={styles.containerItems}>
                <Text style={styles.text}>Terms of Service</Text>
                <TermsIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGoToDetailUrl(urlPrivacyPolicy)}
            >
              <View row style={styles.containerItems}>
                <Text style={styles.text}>Privacy Policy</Text>
                <PrivacyIcon />
              </View>
            </TouchableOpacity>
          </View>

          <Button
            label="Log out"
            height={54}
            backgroundColor={colorsLight.GRAY_LIGHT}
            textColor={colorsLight.ERROR_COLOR}
            onPress={handleLogout}
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    lineHeight: 16,
    fontFamily: "Satoshi-Black",
    fontStyle: "normal",
  },
  text: {
    fontSize: 16,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    lineHeight: 28,
  },
  containerItems: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const SettingsScreen = (
  props: RootStackScreenProps<S_SettingsStackRoutes.SETTINGS>,
) => (
  <ViewModelProvider>
    <SettingsContent {...props} />
  </ViewModelProvider>
);
