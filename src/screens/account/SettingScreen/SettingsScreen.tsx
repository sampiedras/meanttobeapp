import {Button, ContainerSafeArea} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {Text} from '@react-native-material/core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {LocalSvg} from 'react-native-svg';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {useActions} from './useActions';

export const SettingsScreen = (
  props: RootStackScreenProps<RootStackRoutes.SETTINGS>,
) => {
  const {
    navigation: {navigate},
  } = props;
  const {
    urlPrivacyPolicy,
    urlTermsOfService,
    handleLogout,
    handleGoToDetailUrl,
  } = useActions(props);

  return (
    <ContainerSafeArea>
      <View
        flex
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        paddingH-20>
        <View paddingT-30 paddingB-48>
          <Text style={styles.title}>General</Text>
          <TouchableOpacity
            onPress={() => navigate(RootStackRoutes.EDIT_PROFILE)}>
            <View marginV-30 row style={styles.containerItems}>
              <Text style={styles.text}>User profile</Text>
              <LocalSvg
                asset={require('../../../assets/svg/user_circle_gray.svg')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(RootStackRoutes.NOTIFICATIONS)}>
            <View row style={styles.containerItems}>
              <Text style={styles.text}>Notification</Text>
              <LocalSvg asset={require('../../../assets/svg/bell.svg')} />
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
            onPress={() => handleGoToDetailUrl(urlTermsOfService)}>
            <View marginB-30 marginT-30 row style={styles.containerItems}>
              <Text style={styles.text}>Terms of Service</Text>
              <LocalSvg asset={require('../../../assets/svg/terms.svg')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleGoToDetailUrl(urlPrivacyPolicy)}>
            <View row style={styles.containerItems}>
              <Text style={styles.text}>Privacy Policy</Text>
              <LocalSvg asset={require('../../../assets/svg/privacy.svg')} />
            </View>
          </TouchableOpacity>
        </View>

        <Button
          height={54}
          label={'Log out'}
          backgroundColor={colorsLight.GRAY_LIGHT}
          style={styles.logOutButton}
          textColor={colorsLight.ERROR_COLOR}
          onPress={handleLogout}
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    lineHeight: 16,
    fontFamily: 'Satoshi-Black',
    fontStyle: 'normal',
  },
  text: {
    fontSize: 16,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Medium',
    fontStyle: 'normal',
    lineHeight: 28,
  },
  containerItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logOutButton: {
    marginBottom: 28,
  },
});
