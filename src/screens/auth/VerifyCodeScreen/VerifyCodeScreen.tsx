import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {ContainerSafeArea} from '@/components/ContainerSafeArea/ContainerSafeArea';
import {Text} from '@react-native-material/core';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colorsLight} from '@/theme/colorsLight';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {GradientButton} from '@/components';
import _ from '@/@lodash/@lodash';
import {CELL_COUNT, useActionsVerifyCode} from './useActions';

export const VerifyCodeScreen = (
  props: RootStackScreenProps<RootStackRoutes.VERIFY_CODE>,
) => {
  const {
    ref,
    propsCel,
    loading,
    value,
    setValue,
    getCellOnLayoutHandler,
    handleSendCustomChallengeAnswer,
    handleResendCode,
  } = useActionsVerifyCode(props);

  return (
    <ContainerSafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerScroll}>
        <Text variant="h5" style={styles.title}>
          {props.route.params.lastScreen === RootStackRoutes.LOGIN_EMAIL
            ? 'Email verification'
            : 'Phone verification'}
        </Text>
        <Text variant="body2" style={styles.subtitle}>
          We have sent you a code to your{' '}
          {props.route.params.lastScreen === RootStackRoutes.LOGIN_EMAIL
            ? 'email'
            : 'phone'}
          : {'\n'}
          {props.route.params.username}
        </Text>
        <CodeField
          ref={ref}
          {...propsCel}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View marginT-30>
          <Text
            style={styles.textCodeReceive}
            variant="body2"
            color={colorsLight.SECONDARY_TEXT_COLOR}>
            Check your spam or junk mail folder for the verification code.
          </Text>
        </View>
        <View row marginT-24>
          <Text
            style={styles.textCodeReceive}
            variant="body2"
            color={colorsLight.SECONDARY_TEXT_COLOR}>
            Didn’t receive the code?
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text variant="body2" style={styles.textResend}>
              {' '}
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View marginH-16>
        <GradientButton
          label="Verify Account"
          loading={loading}
          disabled={value.length < 6}
          style={styles.button}
          onPress={handleSendCustomChallengeAnswer}
        />
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  containerScroll: {
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Satoshi-Black',
    textAlign: 'left',
    marginVertical: 16,
  },
  subtitle: {
    fontFamily: 'Satoshi-Regular',
    color: colorsLight.SECONDARY_TEXT_COLOR,
  },
  textCodeReceive: {
    fontFamily: 'Satoshi-Regular',
  },
  textResend: {
    color: colorsLight.PRIMARY_COLOR,
    fontFamily: 'Satoshi-Black',
  },
  button: {
    marginBottom: 16,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: colorsLight.GRAY_LIGHT,
    fontFamily: 'Satoshi-Medium',
  },
  focusCell: {
    borderColor: '#000',
  },
});
