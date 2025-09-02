import React from 'react';
import {Control, useController} from 'react-hook-form';
import {IFormLoginEmail} from './useActions';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {LocalSvg} from 'react-native-svg';
import {StyleSheet} from 'react-native';

interface IViewGenderFragment {
  control: Control<IFormLoginEmail>;
}

export const ViewGenderFragment = ({control}: IViewGenderFragment) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name: 'gender',
    rules: {
      required: true,
    },
  });
  return (
    <View style={styles.container} paddingH-16>
      <Text variant="h6" style={styles.title}>
        What is your gender?
      </Text>

      <TouchableOpacity
        row
        centerV
        style={[
          styles.radioButton,
          {
            borderColor:
              field.value === 'Female'
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange('Female')}>
        <Text variant="body1" style={styles.textRadio}>
          Female
        </Text>
        {field.value === 'Female' ? (
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
              field.value === 'Male'
                ? colorsLight.PRIMARY_COLOR
                : colorsLight.GRAY_02,
          },
        ]}
        onPress={() => field.onChange('Male')}>
        <Text variant="body1" style={styles.textRadio}>
          Male
        </Text>
        {field.value === 'Male' ? (
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
    fontFamily: 'Satoshi-Regular',
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
    fontFamily: 'Satoshi-Medium',
  },
});
