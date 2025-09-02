import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {ProgressBar, TouchableOpacity, View} from 'react-native-ui-lib';
import {TabsHomeRoutes, TabsHomeScreenProps} from '@/types/tabRoutes';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {Button, ContainerSafeArea, ModalFilters, Tag} from '@/components';
import {ViewProfileDetail} from './ViewProfileDetail';
import {ViewPricing} from './ViewPricing';
import {RootStackRoutes} from '@/types/stackRoutes';
import {useActionsUser} from './useActionsUser';
import {ImagesUser} from './ImagesUser';
import {useActionsUserMedia} from './useActionsUserMedia';
import {SettingsIcon} from '@/assets/svg/SettingsIcon';
import {appVersion} from '@/utils/appVersion';

export const ProfileScreen = ({
  navigation,
}: TabsHomeScreenProps<TabsHomeRoutes.PROFILE>) => {
  const {
    address,
    visible,
    PersonAge,
    user,
    selectedPage,
    totalPercentageProfile,
    setSelectedPage,
    toggleModalFIlters,
    checkUserIsAuth,
  } = useActionsUser();

  const {avatar, refetchUserMedia} = useActionsUserMedia();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    checkUserIsAuth();
    refetchUserMedia();
    setRefreshing(false);
  }, []);

  return (
    <ContainerSafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {avatar && avatar !== '' && (
          <ImageBackground
            style={styles.imageBackGround}
            source={{
              uri: avatar,
            }}>
            <View row style={styles.containerOptionsHeader}>
              <Button
                backgroundColor={colorsLight.GRAY_LIGHT}
                label="Filters"
                textColor={colorsLight.GRAY_03}
                width={68}
                height={28}
                onPress={toggleModalFIlters}
              />
              <TouchableOpacity
                style={styles.settings}
                onPress={() => navigation.navigate(RootStackRoutes.SETTINGS)}>
                <SettingsIcon />
              </TouchableOpacity>
            </View>
            <View paddingB-28 flex style={styles.containerImages}>
              <ImagesUser />
            </View>
          </ImageBackground>
        )}
        <View flex-1 style={styles.containerBox}>
          <View row marginT-18 centerV style={styles.container}>
            <View centerV row>
              {totalPercentageProfile < 100 ? null : (
                <LocalSvg
                  style={styles.tagCheck}
                  asset={require('../../../assets/svg/radio_button_check_icon.svg')}
                />
              )}
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
                {user?.person?.name}
              </Text>
              <Text style={styles.age}>{PersonAge} Years</Text>
              {totalPercentageProfile < 100 ? (
                <Tag
                  title={`${totalPercentageProfile}%`}
                  backgroundColor={colorsLight.PRIMARY_COLOR}
                  width={58}
                  height={28}
                  fontSize={14}
                  fontFamily="Satoshi-Medium"
                  colorTitle={colorsLight.WHITE}
                  style={{marginLeft: 10}}
                />
              ) : null}
            </View>
          </View>
          <View marginT-20 style={styles.containerChurchLocation}>
            <View row style={styles.subContainerChurch}>
              <LocalSvg
                asset={require('../../../assets/svg/icon_church.svg')}
              />
              <Text
                style={styles.text}
                color={colorsLight.SECONDARY_TEXT_COLOR}>
                {user?.church?.name
                  ? user?.church?.name.split(',')[0]
                  : `Don't have a church`}
              </Text>
            </View>
            <View row style={styles.subContainerLocation}>
              <LocalSvg asset={require('../../../assets/svg/ubication.svg')} />
              <Text
                style={styles.text}
                color={colorsLight.SECONDARY_TEXT_COLOR}>
                {address || 'No location'}
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
                selectedPage === 'pricing'
                  ? colorsLight.PRIMARY_TEXT_COLOR
                  : colorsLight.GRAY_LIGHT
              }
              width={94}
              height={28}
              label="My Plan"
              onPress={() => setSelectedPage('pricing')}
              textColor={
                selectedPage === 'pricing'
                  ? colorsLight.WHITE
                  : colorsLight.SECONDARY_TEXT_COLOR
              }
            />
            <Button
              backgroundColor={
                selectedPage === 'profile'
                  ? colorsLight.PRIMARY_TEXT_COLOR
                  : colorsLight.GRAY_LIGHT
              }
              style={styles.button}
              width={94}
              height={28}
              label="My Profile"
              onPress={() => setSelectedPage('profile')}
              textColor={
                selectedPage === 'pricing'
                  ? colorsLight.SECONDARY_TEXT_COLOR
                  : colorsLight.WHITE
              }
            />
          </View>

          {selectedPage === 'profile' ? <ViewProfileDetail /> : <ViewPricing />}
        </View>
        <Text style={styles.textVersion}>{appVersion}</Text>
      </ScrollView>
      <ModalFilters
        title="Filters"
        visible={visible}
        onClose={toggleModalFIlters}
        onDone={toggleModalFIlters}
      />
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: colorsLight.BACKGROUND_SCREEN_COLOR,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagCheck: {
    marginRight: 12,
  },
  name: {
    marginRight: 10,
    textAlign: 'left',
    fontSize: 22,
    fontFamily: 'Satoshi-Bold',
    flex: 1,
  },
  age: {
    fontSize: 22,
    color: colorsLight.SECONDARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Regular',
  },
  containerChurchLocation: {
    flexDirection: 'column',
  },
  subContainerChurch: {
    alignItems: 'flex-end',
  },
  subContainerLocation: {
    alignItems: 'flex-end',
    marginTop: 16,
  },
  text: {
    paddingLeft: 17,
    fontFamily: 'Satoshi-Regular',
  },
  button: {
    marginLeft: 16,
  },
  settings: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    marginHorizontal: 16,
  },
  imageBackGround: {
    height: Dimensions.get('window').height / 2.4,
    paddingHorizontal: 0,
    position: 'relative',
    resizeMode: 'stretch',
    backgroundColor: colorsLight.GRAY_ONBOARDING,
  },
  containerPercentage: {
    backgroundColor: colorsLight.PRIMARY_COLOR,
    padding: 8,
    borderRadius: 14,
  },
  textPercentage: {
    color: colorsLight.WHITE,
    fontSize: 18,
    fontFamily: 'Satoshi-Medium',
  },
  containerOptionsHeader: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  progressBar: {
    marginTop: 14,
    height: 4,
  },
  containerImages: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textVersion: {
    marginBottom: 80,
    color: 'black',
    textAlign: 'center',
  },
});
