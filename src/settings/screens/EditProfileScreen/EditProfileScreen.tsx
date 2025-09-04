import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { View } from "react-native-ui-lib";
import {
  AppContainerSafeArea,
  Button,
  SelectPickerCountry,
  TextInputAnimatedDisabled,
} from "@/core/components";
import { colorsLight } from "@/core/theme";
import { RootStackScreenProps } from "@/core/types/StackRoutes";
import { S_SettingsStackRoutes } from "@/settings/routes";
import { useViewModelProvider, ViewModelProvider } from "./ViewModelContext";

export const EditProfileContent =
  ({}: RootStackScreenProps<S_SettingsStackRoutes.EDIT_PROFILE>) => {
    const {
      userProfile,
      phoneNumberWithoutPrefix,
      errors,
      countrySelected,
      countryCode,
      control,
      nameField,
      formatDateNormal,
      setCountrySelected,
      handleDeleteUserAccount,
    } = useViewModelProvider();

    const renderContactField = () => {
      if (userProfile?.phone) {
        return (
          <View flex-1>
            <SelectPickerCountry
              label="Country / Region"
              countrySelected={countrySelected}
              setCountrySelected={setCountrySelected}
              disabled
              initialState={countryCode}
            />
            <TextInputAnimatedDisabled
              name="phone_number"
              label="Phone number"
              keyboardType="numeric"
              autoCapitalize="none"
              control={control}
              error={!!errors.phone}
              required
              editable={false}
              value={phoneNumberWithoutPrefix}
            />
          </View>
        );
      } else if (userProfile?.email) {
        return (
          <View flex-1>
            <TextInputAnimatedDisabled
              name="email"
              label="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              control={control}
              error={!!errors.email}
              required
              editable={false}
              value={userProfile?.email}
            />
          </View>
        );
      }
    };

    return (
      <AppContainerSafeArea>
        <View flex-1 center paddingH-16 paddingT-16>
          <FastImage
            source={{
              uri: userProfile?.avatar?.toString() || "",
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
          />
          <View width="100%" paddingT-20 gap-24 flex-1>
            <TextInputAnimatedDisabled
              name="name"
              label="Name"
              keyboardType="default"
              autoCapitalize="none"
              control={control}
              error={!!errors?.name}
              helperTextError={errors?.name?.message}
              required
              value={nameField}
              editable={false}
            />
            <TextInputAnimatedDisabled
              name="birthday"
              label="Birthday"
              keyboardType="default"
              autoCapitalize="none"
              control={control}
              error={!!errors?.dateOfBirth}
              helperTextError={errors?.dateOfBirth?.message}
              required
              value={formatDateNormal}
              editable={false}
            />
            {renderContactField()}
          </View>
          <Button
            height={54}
            label="Delete account"
            backgroundColor={colorsLight.GRAY_LIGHT}
            textColor={colorsLight.ERROR_COLOR}
            onPress={handleDeleteUserAccount}
          />
        </View>
      </AppContainerSafeArea>
    );
  };

const styles = StyleSheet.create({
  image: {
    marginVertical: 16,
    width: 121,
    height: 121,
    borderRadius: 100,
    backgroundColor: colorsLight.GRAY_ONBOARDING,
  },
});

export const EditProfileScreen = (
  props: RootStackScreenProps<S_SettingsStackRoutes.EDIT_PROFILE>,
) => (
  <ViewModelProvider>
    <EditProfileContent {...props} />
  </ViewModelProvider>
);
