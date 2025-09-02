import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-ui-lib';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {CardFragment} from './CardFragment';
import {ContainerSafeArea, ProgressBar} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {Text} from '@react-native-material/core';
import {useActions} from './useActions';
import {QuizQuestionEntity} from '@/api/quizzes/entities/quizzesEntity';
import {TagFragment} from './TagFragment';

const RenderRightHeaderButton = (onPress: () => void) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textShare} color={colorsLight.PRIMARY_COLOR}>
        Share
      </Text>
    </TouchableOpacity>
  );
};

export const QuizQuestionsScreen = (
  props: RootStackScreenProps<RootStackRoutes.QUIZ_QUESTIONS>,
) => {
  const {removeItem, cards, current, count, tags, quizQuestions, quiz} =
    useActions(
      props.route.params.quiz,
      props.route.params.quizId,
      props,
      RenderRightHeaderButton,
    );

  return (
    <ContainerSafeArea>
      {count > 0 ? (
        <View flex paddingH-16>
          <Text style={styles.counter} color={colorsLight.GRAY_03}>
            {current + ' / ' + count}
          </Text>

          <View marginV-12>
            <ProgressBar
              progress={{
                position: current,
                offset: 0,
              }}
              numberOfPages={count + 1}
            />
          </View>

          {count === current ? (
            <View flex marginT-16>
              <FlatList
                data={tags}
                renderItem={({item}) => <TagFragment tag={item} />}
              />
            </View>
          ) : (
            <View flex>
              <Text style={styles.title}>{props.route.params.quiz}</Text>
              {cards.map((item: QuizQuestionEntity, index: number) => {
                return (
                  <CardFragment
                    key={item.id}
                    item={item}
                    index={index}
                    removeItem={removeItem}
                    quantity={count}
                  />
                );
              })}
            </View>
          )}
        </View>
      ) : (
        <View flex center marginV-16>
          <Text style={styles.resultsText}>No questions found</Text>
        </View>
      )}
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  counter: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: 'Satoshi-Bold',
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  resultsText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center',
  },
  textShare: {
    fontSize: 17,
    fontFamily: 'Satoshi-Medium',
    marginRight: 10,
  },
});
