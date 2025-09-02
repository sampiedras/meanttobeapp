import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {colorsLight} from '@/theme/colorsLight';
import {StyleSheet} from 'react-native';
import {
  Button,
  ContainerSafeArea,
  SelectPickerCountry,
  TextInputAnimatedDisabled,
} from '@/components';
import FastImage from 'react-native-fast-image';
import {Text} from '@react-native-material/core';
import {useActionsEditProfile} from './useActions';

export const EditProfileScreen = (
  props: RootStackScreenProps<RootStackRoutes.EDIT_PROFILE>,
) => {
  const {
    control,
    errors,
    nameField,
    formatDate,
    phoneNumber,
    phoneNumberWithoutPrefix,
    email,
    countrySelected,
    countryCode,
    apple,
    user,
    setCountrySelected,
    handleDeleteUserAccount,
  } = useActionsEditProfile(props);

  const renderContactField = () => {
    if (phoneNumber) {
      return (
        <>
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
            error={!!errors.phone_number}
            helperTextError={errors.phone_number?.message}
            required
            editable={false}
            value={phoneNumberWithoutPrefix}
          />
        </>
      );
    } else if (email) {
      return (
        <TextInputAnimatedDisabled
          name="email"
          label="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          control={control}
          error={!!errors.email}
          helperTextError={errors.email?.message}
          required
          editable={false}
          value={email}
        />
      );
    }
  };

  return (
    <ContainerSafeArea style={styles.container}>
      <View flex-1 paddingH-16>
        <View style={styles.imageEdit}>
          <FastImage
            source={{
              uri: user?.avatar,
              priority: FastImage.priority.normal,
            }}
            style={styles.avatar}
          />
        </View>
        {apple && (
          <Text
            style={styles.textSignInWithApple}
            color={colorsLight.PRIMARY_TEXT_COLOR}
            variant="body1">
            Sign In With Apple
          </Text>
        )}
        <View style={styles.containerTextInput}>
          <TextInputAnimatedDisabled
            name="name"
            label="Name"
            keyboardType="default"
            autoCapitalize="none"
            control={control}
            error={!!errors?.name}
            helperTextError={errors?.name?.message}
            required
            value={nameField.value}
            editable={false}
          />
          <TextInputAnimatedDisabled
            name="birthday"
            label="Birthday"
            keyboardType="default"
            autoCapitalize="none"
            control={control}
            error={!!errors?.birthday}
            helperTextError={errors?.birthday?.message}
            required
            value={formatDate}
            editable={false}
          />
          {renderContactField()}
        </View>
      </View>
      <View paddingH-16>
        <Button
          height={54}
          label="Delete account"
          backgroundColor={colorsLight.GRAY_LIGHT}
          textColor={colorsLight.ERROR_COLOR}
          style={styles.deleteButton}
          onPress={handleDeleteUserAccount}
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
  },
  textEdit: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
  },
  textSave: {
    fontSize: 17,
    fontFamily: 'Satoshi-Medium',
  },
  imageEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    width: 122,
  },
  boxImage: {
    width: 121,
    height: 121,
    borderRadius: 100,
    justifyContent: 'center',
  },
  imagePreview: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 100,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  editMaskContainer: {
    position: 'absolute',
    bottom: -1,
    alignSelf: 'center',
  },
  avatar: {
    width: 121,
    height: 121,
    borderRadius: 100,
    backgroundColor: colorsLight.GRAY_ONBOARDING,
  },
  containerTextInput: {
    gap: 24,
    paddingBottom: 20,
  },
  containerDatePicker: {
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
    alignItems: 'flex-start',
    borderRadius: 16,
    height: 75,
    width: '100%',
  },
  titleDatePicker: {
    fontSize: 12,
    position: 'absolute',
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    fontFamily: 'Satoshi-Regular',
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  textPicker: {
    marginTop: 30,
    paddingHorizontal: 14,
    fontSize: 16,
    height: 48,
    fontFamily: 'Satoshi-Black',
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    marginLeft: 16,
    fontFamily: 'Satoshi-Regular',
  },
  textSignInWithApple: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Satoshi-Bold',
    marginBottom: 30,
  },
  deleteButton: {
    marginBottom: 28,
  },
});
