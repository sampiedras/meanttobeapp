import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {colorsLight} from '@/theme/colorsLight';
import {Text, View} from 'react-native-ui-lib';
import {CircleButton, GradientButton} from '@/components';
import {LocalSvg} from 'react-native-svg';

interface IModalAnswerFragment {
  visible: boolean;
  title: string;
  answerUser: string;
  handleGetAnswer: (answer: string) => void;
  onClose: () => void;
}

export const ModalAnswerFragment = ({
  visible,
  title,
  answerUser,
  handleGetAnswer,
  onClose,
}: IModalAnswerFragment) => {
  const [answer, setAnswer] = useState(answerUser);

  const onSaveButtonPress = () => {
    handleGetAnswer(answer);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => null}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerView}>
        <View style={styles.contentContainer}>
          <View style={styles.container}>
            <View flex-1>
              <View row centerV>
                <CircleButton
                  style={styles.buttonClose}
                  onPress={onClose}
                  backgroundColor={colorsLight.FILL_COLOR_LIGHT}
                  height={30}
                  width={30}
                  icon={
                    <LocalSvg
                      asset={require('../../../assets/svg/close_disabled.svg')}
                    />
                  }
                />
                <View style={styles.containerTextFind}>
                  <Text variant="h6" style={styles.titleFind}>
                    {title}
                  </Text>
                </View>
              </View>
              <View style={styles.boxInput}>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  multiline
                  numberOfLines={4}
                  maxLength={255}
                  style={styles.textInput}
                  placeholder="Write your answer"
                  placeholderTextColor={colorsLight.GRAY_03}
                />
              </View>
            </View>
            <View style={styles.buttonSave}>
              <GradientButton
                label="Save"
                disabled={!answer}
                onPress={onSaveButtonPress}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '100%',
    height: '80%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 32,
    backgroundColor: 'white',
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
  },
  containerTextFind: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleFind: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'Satoshi-Black',
  },
  boxInput: {
    width: '100%',
    padding: 16,
    minHeight: 120,
    borderRadius: 8,
    marginTop: 24,
    backgroundColor: colorsLight.BACKGROUND_TEXT_INPUT_COLOR,
  },
  textInput: {
    flex: 1,
    color: colorsLight.PRIMARY_TEXT_COLOR,
    textAlignVertical: 'top',
    fontFamily: 'Satoshi-Regular',
  },
  buttonSave: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonClose: {
    marginRight: 20,
  },
});
