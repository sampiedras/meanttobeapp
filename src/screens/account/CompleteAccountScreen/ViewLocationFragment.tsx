import {StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {IFormLoginEmail} from './useActions';
import {Control, FieldErrors, useController} from 'react-hook-form';
import _ from '@/@lodash/@lodash';
import {LocalSvg} from 'react-native-svg';

interface IViewLocationFragment {
  control: Control<IFormLoginEmail>;
}

export const ViewLocationFragment = ({control}: IViewLocationFragment) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name: 'location',
    rules: {
      required: true,
    },
  });
  return (
    <View style={styles.container} paddingH-16>
      <Text variant="h6" style={styles.title}>
        Where do you want to meet people from?
      </Text>

      <TouchableOpacity
        row
        centerV
        style={[
          styles.radioButton,
          {
            borderColor:
              field.value === 'near_me'
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange('near_me')}>
        <Text variant="body1" style={styles.textRadio}>
          Near me
        </Text>
        {field.value === 'near_me' ? (
          <LocalSvg
            asset={require('../../../assets/svg/radio_button_check_icon.svg')}
          />
        ) : (
          <LocalSvg
            asset={require('../../../assets/svg/radio_button_icon.svg')}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        row
        centerV
        style={[
          styles.radioButton,
          {
            borderColor:
              field.value === 'globally'
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange('globally')}>
        <Text variant="body1" style={styles.textRadio}>
          Globally
        </Text>
        {field.value === 'globally' ? (
          <LocalSvg
            asset={require('../../../assets/svg/radio_button_check_icon.svg')}
          />
        ) : (
          <LocalSvg
            asset={require('../../../assets/svg/radio_button_icon.svg')}
          />
        )}
      </TouchableOpacity>
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
    fontFamily: 'Satoshi-Regular'
  },
  radioButton: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  textRadio: {
    fontFamily: 'Satoshi-Medium'
  },
});
