import React from "react";
import {
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar, TouchableOpacity, View } from "react-native-ui-lib";
import { RadioButtonCheckIcon, SettingsIcon } from "@/core/assets/svg";
import { AppContainerSafeArea, Button, Tag } from "@/core/components";
import { useAuthProvider } from "@/core/context/AuthContext";
import { colorsLight } from "@/core/theme";
import { TabsHomeScreenProps } from "@/core/types/StackRoutes";
import { appVersion } from "@/core/utils/appVersion";
import { getStateAndCountryFromFormattedAddress } from "@/core/utils/getStateAndCountry";
import { E_ExplorerStackRoutes } from "@/explorer";
import { ChurchIcon, LocationIcon } from "@/explorer/assets/svg";
import { calculateAge } from "@/explorer/utils/calculateAge";
import { S_SettingsStackRoutes } from "@/settings";
import {
  ImagesUserFragment,
  ModalFiltersFragment,
  ViewPricingFragment,
  ViewProfileDetailFragment,
} from "./fragments";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const ProfileContent =
  ({}: TabsHomeScreenProps<E_ExplorerStackRoutes.PROFILE>) => {
    const { navigate } = useNavigation();
    const { userProfile } = useAuthProvider();
    const {
      refreshing,
      totalPercentageProfile,
      selectedPage,
      locationAddress,
      setSelectedPage,
      handleRefresh,
      handleToggleModalFilters,
    } = useViewModelProvider();

    return (
      <AppContainerSafeArea>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {userProfile?.avatar && userProfile?.avatar !== "" && (
            <ImageBackground
              style={styles.imageBackGround}
              source={{
                uri: userProfile?.avatar,
              }}
            >
              <View row style={styles.containerOptionsHeader}>
                <Button
                  backgroundColor={colorsLight.GRAY_LIGHT}
                  label="Filters"
                  textColor={colorsLight.GRAY_03}
                  width={68}
                  height={28}
                  onPress={handleToggleModalFilters}
                />
                <TouchableOpacity
                  style={styles.settings}
                  onPress={() => navigate(S_SettingsStackRoutes.SETTINGS)}
                >
                  <SettingsIcon />
                </TouchableOpacity>
              </View>
              <View paddingB-28 flex style={styles.containerImages}>
                <ImagesUserFragment />
              </View>
            </ImageBackground>
          )}

          <View flex-1 style={styles.containerBox}>
            <View row marginT-18 centerV style={styles.container}>
              <View centerV row>
                {totalPercentageProfile < 100 ? null : (
                  <RadioButtonCheckIcon style={styles.tagCheck} />
                )}
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.name}
                >
                  {userProfile?.name}
                </Text>
                <Text style={styles.age}>
                  {calculateAge(userProfile?.dateOfBirth || "")} Years
                </Text>
                {totalPercentageProfile < 100 ? (
                  <Tag
                    title={`${totalPercentageProfile}%`}
                    backgroundColor={colorsLight.PRIMARY_COLOR}
                    width={58}
                    height={28}
                    fontSize={14}
                    fontFamily="Satoshi-Medium"
                    colorTitle={colorsLight.WHITE}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ marginLeft: 10 }}
                  />
                ) : null}
              </View>
            </View>
            <View marginT-20 style={styles.containerChurchLocation}>
              <View row style={styles.subContainerChurch}>
                <ChurchIcon />
                <Text
                  style={styles.text}
                  color={colorsLight.SECONDARY_TEXT_COLOR}
                >
                  {userProfile?.church || "Don't have a church"}
                </Text>
              </View>
              <View row style={styles.subContainerLocation}>
                <LocationIcon />
                <Text
                  style={styles.text}
                  color={colorsLight.SECONDARY_TEXT_COLOR}
                >
                  {locationAddress
                    ? getStateAndCountryFromFormattedAddress(locationAddress)
                    : "No location"}
                </Text>
              </View>
            </View>
            {totalPercentageProfile < 100 ? (
              <ProgressBar
                style={styles.progressBar}
                progress={totalPercentageProfile}
                progressColor={colorsLight.PRIMARY_COLOR}
              />
            ) : (
              <View
                width="100%"
                height={1}
                marginT-24
                backgroundColor={colorsLight.GRAY_02}
              />
            )}
            <View row marginT-24>
              <Button
                backgroundColor={
                  selectedPage === "pricing"
                    ? colorsLight.PRIMARY_TEXT_COLOR
                    : colorsLight.GRAY_LIGHT
                }
                width={94}
                height={28}
                label="My Plan"
                onPress={() => setSelectedPage("pricing")}
                textColor={
                  selectedPage === "pricing"
                    ? colorsLight.WHITE
                    : colorsLight.SECONDARY_TEXT_COLOR
                }
              />
              <Button
                backgroundColor={
                  selectedPage === "profile"
                    ? colorsLight.PRIMARY_TEXT_COLOR
                    : colorsLight.GRAY_LIGHT
                }
                style={styles.button}
                width={94}
                height={28}
                label="My Profile"
                onPress={() => setSelectedPage("profile")}
                textColor={
                  selectedPage === "pricing"
                    ? colorsLight.SECONDARY_TEXT_COLOR
                    : colorsLight.WHITE
                }
              />
            </View>

            {selectedPage === "profile" ? (
              <ViewProfileDetailFragment />
            ) : (
              <ViewPricingFragment />
            )}
          </View>
          <Text style={styles.textVersion}>{appVersion}</Text>
        </ScrollView>
        <ModalFiltersFragment />
      </AppContainerSafeArea>
    );
  };

export const ProfileScreen = (
  props: TabsHomeScreenProps<E_ExplorerStackRoutes.PROFILE>,
) => (
  <ViewModelProvider>
    <ProfileContent {...props} />
  </ViewModelProvider>
);

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagCheck: {
    marginRight: 12,
  },
  name: {
    marginRight: 10,
    textAlign: "left",
    fontSize: 22,
    fontFamily: "Satoshi-Bold",
    flex: 1,
  },
  age: {
    fontSize: 22,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontFamily: "Satoshi-Regular",
  },
  containerChurchLocation: {
    flexDirection: "column",
  },
  subContainerChurch: {
    alignItems: "flex-end",
  },
  subContainerLocation: {
    alignItems: "flex-end",
    marginTop: 16,
  },
  text: {
    paddingLeft: 17,
    fontFamily: "Satoshi-Regular",
  },
  button: {
    marginLeft: 16,
  },
  settings: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 16,
  },
  imageBackGround: {
    height: Dimensions.get("window").height / 2.4,
    paddingHorizontal: 0,
    position: "relative",
    resizeMode: "stretch",
    backgroundColor: colorsLight.GRAY_ONBOARDING,
  },
  containerOptionsHeader: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  progressBar: {
    marginTop: 14,
    height: 4,
  },
  containerImages: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textVersion: {
    marginBottom: 80,
    color: "black",
    textAlign: "center",
  },
});
