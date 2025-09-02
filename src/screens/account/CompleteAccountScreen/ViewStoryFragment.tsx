import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {colorsLight} from '@/theme/colorsLight';
import {IFormLoginEmail} from './useActions';
import {Control, FieldErrors, useController} from 'react-hook-form';
import _ from '@/@lodash/@lodash';

interface IViewStoryFragment {
  control: Control<IFormLoginEmail>;
  errors: FieldErrors<IFormLoginEmail>;
}

export const ViewStoryFragment = ({control, errors}: IViewStoryFragment) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name: 'story',
    rules: {
      required: true,
    },
  });

  return (
    <View style={styles.container} paddingH-16>
      <Text variant="h6" style={styles.title}>
        Share your story with the world
      </Text>
      <View style={styles.boxInput}>
        <TextInput
          style={styles.input}
          value={field.value}
          multiline
          numberOfLines={4}
          maxLength={750}
          placeholder="Your story"
          placeholderTextColor={colorsLight.GRAY_ONBOARDING}
          onChangeText={field.onChange}
        />
      </View>
      {!!errors?.story && (
        <Text style={styles.textError}>{errors?.story?.message}</Text>
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
    fontFamily: 'Satoshi-Regular'
  },
  boxInput: {
    width: '100%',
    padding: 16,
    minHeight: 120,
    borderRadius: 8,
    marginTop: 48,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
  input: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlignVertical: 'top',
    fontFamily: 'Satoshi-Regular'
  },
  helper: {
    color: colorsLight.SECONDARY_TEXT_COLOR,
    marginBottom: 16,
    marginTop: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Satoshi-Regular'
  },
});
