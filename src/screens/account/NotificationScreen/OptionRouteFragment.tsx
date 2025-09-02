import {colorsLight} from '@/theme/colorsLight';
import {RootStackRoutes} from '@/types/stackRoutes';
import {Text} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {LocalSvg} from 'react-native-svg';
import {View, TouchableOpacity} from 'react-native-ui-lib';

interface option {
  title: string;
}

export const OptionRouteFragment: React.FC<option> = props => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(RootStackRoutes.GENERAL_NOTIFICATIONS, {
          title: props.title,
        })
      }
      style={styles.itemButtonContainer}>
      <View height={44} style={styles.itemContainer} row spread>
        <Text style={styles.title} color={colorsLight.PRIMARY_TEXT_COLOR}>
          {props.title}
        </Text>
        <LocalSvg asset={require('../../../assets/svg/chevron_right.svg')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemButtonContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
});
