import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CircleButton, ContainerSafeArea} from '@/components';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {
  CallWhiteIcon,
  MediaGalleryIcon,
  NotificationBellIcon,
  NotificationBellWhiteIcon,
  PencilEditIcon,
} from '@/assets/svg';
import {useActions} from './useActions';

export const ContactProfileScreen = (
  props: RootStackScreenProps<RootStackRoutes.CONTACT_PROFILE>,
) => {
  const {userOwn, formatDate, navigation} = useActions(props);

  return (
    <ContainerSafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View center>
          <FastImage
            source={{uri: userOwn?.user?.image}}
            style={styles.avatar}
          />
        </View>

        <View center>
          <Text
            numberOfLines={2}
            color={colorsLight.PRIMARY_TEXT_COLOR}
            style={styles.textName}>
            {userOwn?.user?.name}
          </Text>
        </View>

        <Text
          color={colorsLight.SECONDARY_TEXT_COLOR}
          style={styles.textLastConnection}>
          Last connection: {formatDate}
        </Text>

        <View marginT-32 row center style={styles.containerFunctionalities}>
          <View center>
            <CircleButton
              onPress={() => navigation.pop()}
              icon={<PencilEditIcon />}
              backgroundColor={colorsLight.PRIMARY_COLOR}
              width={40}
              height={40}
            />
            <Text
              style={styles.textFunctionalities}
              color={colorsLight.PRIMARY_COLOR}>
              Message
            </Text>
          </View>
          <View center>
            <CircleButton
              icon={<NotificationBellWhiteIcon />}
              backgroundColor={colorsLight.PRIMARY_COLOR}
              width={40}
              height={40}
            />
            <Text
              style={styles.textFunctionalities}
              color={colorsLight.PRIMARY_COLOR}>
              Mute
            </Text>
          </View>
        </View>
        <Text
          color={colorsLight.SECONDARY_TEXT_COLOR}
          style={styles.textMoreActions}>
          More actions
        </Text>
        <View paddingH-16 marginT-34 style={styles.containerMoreActions}>
          <TouchableOpacity>
            <View row>
              <MediaGalleryIcon />
              <Text
                color={colorsLight.PRIMARY_TEXT_COLOR}
                style={styles.textViewMedia}>
                View media
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  containerMoreActions: {
    flexDirection: 'column',
  },
  containerFunctionalities: {
    justifyContent: 'space-evenly',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: colorsLight.PRIMARY_COLOR,
  },
  textName: {
    fontFamily: 'Satoshi-Black',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 24,
    maxWidth: 250,
  },
  textLastConnection: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  textMoreActions: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    marginTop: 34,
    paddingLeft: 16,
  },
  textFunctionalities: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
    marginTop: 8,
  },
  textViewMedia: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    marginLeft: 16,
  },
  textNotifications: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    marginLeft: 16,
  },
});
