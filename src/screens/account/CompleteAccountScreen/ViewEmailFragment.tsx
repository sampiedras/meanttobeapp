import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {IFormLoginEmail} from './useActions';
import {Control, FieldErrors, useController} from 'react-hook-form';
import _ from '@/@lodash/@lodash';

interface IViewEmailFragment {
  control: Control<IFormLoginEmail>;
  errors: FieldErrors<IFormLoginEmail>;
}

export const ViewEmailFragment = ({control, errors}: IViewEmailFragment) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name: 'name',
    rules: {
      required: true,
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="h6" style={styles.title}>
        What is your name?
      </Text>
      <TextInput
        style={styles.input}
        value={field.value}
        placeholder="Your name"
        placeholderTextColor={colorsLight.GRAY_ONBOARDING}
        onChangeText={field.onChange}
      />
      {!!errors?.name && (
        <Text style={styles.textError}>{errors?.name?.message}</Text>
      )}
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
  input: {
    fontSize: 32,
    marginTop: 24,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    width: '80%',
    textAlign: 'center',
    fontFamily: 'Satoshi-Black',
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    marginLeft: 16,
    fontFamily: 'Satoshi-Regular',
  },
});
