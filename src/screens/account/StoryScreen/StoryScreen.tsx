import React from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {View} from 'react-native-ui-lib';
import {Text} from '@react-native-material/core';
import {ContainerSafeArea, GradientButton} from '@/components';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native';
import {useController} from 'react-hook-form';
import {colorsLight} from '@/theme/colorsLight';
import {useActions} from './useActions';

export const StoryScreen = (
  props: RootStackScreenProps<RootStackRoutes.STORY>,
) => {
  const {control, errors, getValues, upDateStoryUser, loading} =
    useActions(props);

  const {field} = useController({
    control,
    defaultValue: '',
    name: 'story',
    rules: {
      required: true,
    },
  });

  return (
    <ContainerSafeArea>
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
      <GradientButton
        loading={loading}
        label="Save changes"
        height={50}
        disabled={!getValues('story')}
        style={styles.button}
        onPress={upDateStoryUser}
      />
    </ContainerSafeArea>
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
  boxInput: {
    width: '100%',
    padding: 16,
    minHeight: 140,
    borderRadius: 8,
    marginTop: 48,
    borderWidth: 1,
    borderColor: colorsLight.GRAY_02,
  },
  input: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlignVertical: 'top',
    fontFamily: 'Satoshi-Regular',
  },
  textError: {
    color: colorsLight.ERROR,
    marginBottom: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Satoshi-Regular',
  },
  button: {
    marginBottom: 18,
    paddingHorizontal: 10,
  },
});
