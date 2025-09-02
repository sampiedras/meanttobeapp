import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';
import {Animated, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {colorsLight} from '@/theme/colorsLight';
import {useActionsCard} from './useActionsCard';
import {
  QuizAnswersEntity,
  QuizQuestionEntity,
} from '@/api/quizzes/entities/quizzesEntity';

interface props {
  item: QuizQuestionEntity;
  index: number;
  quantity: number;
  removeItem: (tagId: string) => void;
}

const RenderAnswer = ({
  item,
  handlePress,
}: {
  item: QuizAnswersEntity;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.answer} onPress={handlePress}>
      <Text style={styles.answerText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export const CardFragment = ({item, index, removeItem, quantity}: props) => {
  const {answers, rotate, pan, changeQuestion} = useActionsCard(
    removeItem,
    item.id,
  );

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        styles.center,
        {
          opacity: quantity - index,
          zIndex: quantity - index,
        },
      ]}>
      <Animated.View
        style={[
          styles.animateContainer,
          {
            transform: [{translateX: pan.current.x}, {rotate: rotate}],
            marginTop: index * 40,
          },
        ]}>
        <View
          padding-16
          backgroundColor={colorsLight.FILL_QUIZZES_QUESTION_CARD}
          height={'90%'}
          centerH
          style={styles.item}>
          <Text color={colorsLight.WHITE} style={styles.questionText}>
            {item.name}
          </Text>
          {answers.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={styles.answerList}
              data={answers}
              renderItem={({item}) => (
                <RenderAnswer
                  item={item}
                  handlePress={() => changeQuestion(item.tagId)}
                />
              )}
            />
          ) : (
            <View flex center>
              <Text style={styles.questionText} color={colorsLight.WHITE}>
                No options found
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colorsLight.GRAY_BR,
  },
  animateContainer: {
    width: '90%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerList: {
    marginTop: 16,
    width: '100%',
  },
  answer: {
    backgroundColor: colorsLight.WHITE,
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
  },
  questionText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: colorsLight.GRAY_03,
  },
});
