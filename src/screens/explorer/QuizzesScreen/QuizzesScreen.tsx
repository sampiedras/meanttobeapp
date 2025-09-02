import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@react-native-material/core';
import {View} from 'react-native-ui-lib';
import {CardFragment} from './fragments';
import {ContainerSafeArea} from '@/components';
import {colorsLight} from '@/theme/colorsLight';
import {useActionsQuizzes} from './useActions';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';

export const QuizzesScreen = (
  props: RootStackScreenProps<RootStackRoutes.QUIZZES>,
) => {
  const {cards, removeItem, handleGoQuiz} = useActionsQuizzes(props);

  return (
    <ContainerSafeArea>
      <View
        flex
        backgroundColor={colorsLight.BACKGROUND_SCREEN_COLOR}
        padding-16>
        <View row spread centerV width={'100%'}>
          <Text style={styles.title}>Quizzes</Text>

          <View
            backgroundColor={colorsLight.FILL_COUNTER_QUIZZES}
            paddingV-4
            paddingH-15
            br100>
            <Text style={styles.counterText}>{cards.length} Quizzes</Text>
          </View>
        </View>

        <View flex>
          {cards.map((item, index: number) => (
            <CardFragment
              key={item.id}
              item={item}
              index={index}
              removeItem={removeItem}
              quantity={cards.length}
              handleGoQuiz={handleGoQuiz}
            />
          ))}
        </View>
      </View>
    </ContainerSafeArea>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 34,
  },
  counterText: {
    padding: 4,
    fontFamily: 'Satoshi-Bold',
    fontSize: 12,
  },
});
