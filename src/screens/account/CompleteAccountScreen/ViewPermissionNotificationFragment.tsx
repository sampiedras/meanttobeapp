import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';

interface IViewPermissionNotificationFragment {}

export const ViewPermissionNotificationFragment =
  ({}: IViewPermissionNotificationFragment) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enabling notifications allows us to give you a personalized experience
          and helps keep you informed of everything going on in
        </Text>
        <Text style={styles.titleMeantToBe}>Meant to Be.</Text>
        <View flex-1 center>
          <LocalSvg
            asset={require('../../../assets/svg/permission_notification_icon.svg')}
          />
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
  },
  title: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  titleMeantToBe: {
    color: colorsLight.PRIMARY_TEXT_COLOR,
    fontFamily: 'Satoshi-Black',
    fontSize: 16,
    textAlign: 'center',
  },
});
