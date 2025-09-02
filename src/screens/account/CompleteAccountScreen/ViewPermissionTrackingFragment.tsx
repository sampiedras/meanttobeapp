import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';

interface IViewPermissionTrackingFragment {}

export const ViewPermissionTrackingFragment =
  ({}: IViewPermissionTrackingFragment) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          This app uses tracking to enhance your experience. Can you allow
          tracking for personalized recommendations?
        </Text>
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
});
