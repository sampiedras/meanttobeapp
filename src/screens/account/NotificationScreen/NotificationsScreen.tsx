import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {Switch, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {FlatList, StyleSheet} from 'react-native';
import {OptionRouteFragment} from './OptionRouteFragment';
import {useActionsNotifications} from './useActions';
import {colorsLight} from '@/theme/colorsLight';
import {generalOptions} from '@/fakeDb/generalOptions';

export const NotificationsScreen = (
  props: RootStackScreenProps<RootStackRoutes.NOTIFICATIONS>,
) => {
  const {enableNotifications, handleEnableNotifications} =
    useActionsNotifications(props);
  return (
    <View
      backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
      paddingH-20
      flex
      centerH>
      <Text color={colorsLight.PRIMARY_TEXT_COLOR} style={styles.subtitle}>
        Choose what activities matter to you to keep in touch with.
      </Text>

      <View height={44} row spread width="100%" centerV marginB-36 paddingH-8>
        <Text
          color={colorsLight.PRIMARY_TEXT_COLOR}
          style={styles.textEnableNotification}>
          Enable notification
        </Text>
        <Switch
          onColor={colorsLight.PRIMARY_COLOR}
          value={enableNotifications}
          onValueChange={handleEnableNotifications}
        />
      </View>

      <View width="100%">
        <Text
          color={colorsLight.GRAY_03}
          style={styles.textGeneralNotification}>
          General notification
        </Text>

        <FlatList
          style={styles.routesContainer}
          data={generalOptions}
          renderItem={({item}) => <OptionRouteFragment title={item.title} />}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    marginTop: 36,
    marginBottom: 36,
    fontFamily: 'Satoshi-Regular',
  },
  textEnableNotification: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 17,
  },
  textGeneralNotification: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
    height: 22,
    fontFamily: 'Satoshi-Medium',
  },
  routesContainer: {
    paddingTop: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
});
