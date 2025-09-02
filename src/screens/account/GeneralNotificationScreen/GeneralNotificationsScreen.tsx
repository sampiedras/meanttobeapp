import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {colorsLight} from '@/theme/colorsLight';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {optionsNotifications} from '@/fakeDb/optionsNotifications';
import {OptionSwitchFragment} from './OptionSwitchFragment';
import {generalNotificationsCopies} from '@/utils/copies';

export const GeneralNotificationsScreen =
  ({}: RootStackScreenProps<RootStackRoutes.GENERAL_NOTIFICATIONS>) => {
    return (
      <View
        paddingH-20
        centerH
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        flex>
        <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.subtitle}>
          {generalNotificationsCopies.subtitle}
        </Text>
        <View width="100%">
          <FlatList
            style={styles.flatLisOptionsNotifications}
            data={optionsNotifications}
            renderItem={({item}) => <OptionSwitchFragment title={item.title} />}
            keyExtractor={item => item.title}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
          />
        </View>
        {/* <View width="100%" style={styles.containerText}>
          <Text style={styles.text} color={colorsLight.PRIMARY_TEXT_COLOR}>
            We send a confirmation to jud******@gmail.com. Please open
          </Text>
          <Text style={styles.subtext} color={colorsLight.PRIMARY_TEXT_COLOR}>
            the link in it to complete the process.
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.textChangeEmail}
              color={colorsLight.PRIMARY_COLOR}>
              Change email address?
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

const styles = StyleSheet.create({
  subtitle: {
    width: '80%',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 36,
    marginBottom: 36,
    fontFamily: 'Satoshi-Regular',
  },
  flatLisOptionsNotifications: {
    paddingTop: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
  containerText: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 12,
    marginTop: 18,
    fontFamily: 'Satoshi-Regular',
  },
  subtext: {
    fontSize: 12,
    marginTop: 10,
    fontFamily: 'Satoshi-Regular',

  },
  textChangeEmail: {
    fontSize: 12,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginTop: 30,
    fontFamily: 'Satoshi-Medium',
  },
});
