import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';

interface IViewPermissionLocationFragment {}

export const ViewPermissionLocationFragment =
  ({}: IViewPermissionLocationFragment) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          In order to use the application we’ll need to gain access to your
          location.
        </Text>
        <View flex-1 center>
          <LocalSvg
            asset={require('../../../assets/svg/permission_location_icon.svg')}
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
