import {useGetAnswersByQuestionIdQuery} from '@/api/quizzes/quizzesApi';
import {useRef} from 'react';
import {Animated, useWindowDimensions} from 'react-native';

export const useActionsCard = (
  removeItem: (tagId: string) => void,
  questionId: string,
) => {
  const {width} = useWindowDimensions();

  const {data: answers = []} = useGetAnswersByQuestionIdQuery(questionId);

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0}));
  const rotate = pan.current.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['40deg', '0deg', '-40deg'],
  });

  const changeQuestion = (tagId: string) => {
    setTimeout(() => {
      Animated.spring(pan.current, {
        toValue: {x: width * 2, y: 0},
        useNativeDriver: true,
        bounciness: 10,
      }).start();
    }, 400);
    setTimeout(() => {
      removeItem(tagId);
    }, 500);
  };

  return {
    answers,
    width,
    rotate,
    pan,
    changeQuestion,
  };
};
