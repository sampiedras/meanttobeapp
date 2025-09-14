import React from "react";
import {
  Dimensions,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import * as RNProgress from "react-native-progress";
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
              <View style={[styles.row, styles.containerOptionsHeader]}>
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
              <View
                style={[styles.paddingB28, styles.flex, styles.containerImages]}
              >
                <ImagesUserFragment />
              </View>
            </ImageBackground>
          )}

          <View style={[styles.flex1, styles.containerBox]}>
            <View
              style={[
                styles.row,
                styles.marginT18,
                styles.centerV,
                styles.container,
              ]}
            >
              <View style={[styles.centerV, styles.row]}>
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
            <View style={[styles.marginT20, styles.containerChurchLocation]}>
              <View style={[styles.row, styles.subContainerChurch]}>
                <ChurchIcon />
                <Text
                  style={styles.text}
                  color={colorsLight.SECONDARY_TEXT_COLOR}
                >
                  {userProfile?.church || "Don't have a church"}
                </Text>
              </View>
              <View style={[styles.row, styles.subContainerLocation]}>
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
              <RNProgress.Bar
                style={styles.progressBar}
                progress={totalPercentageProfile / 100}
                color={colorsLight.PRIMARY_COLOR}
                width={null}
                height={4}
                unfilledColor={colorsLight.GRAY_02}
                borderWidth={0}
              />
            ) : (
              <View
                style={[
                  styles.fullWidth,
                  styles.height1,
                  styles.marginT24,
                  { backgroundColor: colorsLight.GRAY_02 },
                ]}
              />
            )}
            <View style={[styles.row, styles.marginT24]}>
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
  row: { flexDirection: "row" },
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
  paddingB28: { paddingBottom: 28 },
  flex: { flex: 1 },
  flex1: { flex: 1 },
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
  marginT20: { marginTop: 20 },
  marginT18: { marginTop: 18 },
  centerV: { alignItems: "center" },
  fullWidth: { width: "100%" },
  height1: { height: 1 },
  marginT24: { marginTop: 24 },
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
