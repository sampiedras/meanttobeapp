import {StyleSheet} from 'react-native';
import React from 'react';
import {colorsLight} from '@/theme/colorsLight';
import {TouchableOpacity, View} from 'react-native-ui-lib';
import {LocalSvg} from 'react-native-svg';
import {Text} from '@react-native-material/core';
import {IQuestionResponse} from '@/api/question/entities/questionEntity';

interface IRenderButton {
  item: IQuestionResponse;
  toggleModalAnswer: (item: IQuestionResponse) => void;
  toggleModalSelectQuestion: () => void;
}

export const RenderButton = ({
  item,
  toggleModalAnswer,
  toggleModalSelectQuestion,
}: IRenderButton) => {
  return (
    <TouchableOpacity
      row
      centerV
      spread
      style={styles.button}
      onPress={() =>
        item.id === 1 ? toggleModalSelectQuestion() : toggleModalAnswer(item)
      }>
      <View centerV row>
        {item.answer && (
          <LocalSvg
            asset={require('../../../assets/svg/check_succes.svg')}
            style={styles.checkSuccessIcon}
          />
        )}
        <Text variant="body1" style={styles.textItem} numberOfLines={2}>
          {item.question}
        </Text>
      </View>

      <LocalSvg asset={require('../../../assets/svg/arrow_down.svg')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
    borderColor: colorsLight.GRAY_02,
  },
  checkSuccessIcon: {
    marginRight: 4,
  },
  textItem: {
    flex: 1,
    fontFamily: 'Satoshi-Regular',
  },
});
