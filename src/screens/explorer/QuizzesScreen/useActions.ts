import {useCallback, useEffect, useState} from 'react';
import {useLazyGetAllQuizzesQuery} from '@/api/quizzes/quizzesApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {apiBase} from '@/utils/config';

export const useActionsQuizzes = ({
  navigation,
}: RootStackScreenProps<RootStackRoutes.QUIZZES>) => {
  const [getAllQuizzes, {data = []}] = useLazyGetAllQuizzesQuery();
  const [cards, setCards] = useState(data);

  const handleGoQuiz = useCallback(
    (quiz: string, quizId: string) => {
      navigation.navigate(RootStackRoutes.QUIZ_QUESTIONS, {
        quiz,
        quizId,
      });
    },
    [navigation],
  );

  const removeItem = useCallback(() => {
    setCards(prevCards => {
      const [firstItem, ...rest] = prevCards;
      return [...rest, firstItem];
    });
  }, []);

  const getCards = useCallback(() => {
    getAllQuizzes().then(({data}) => setCards(data || []));
  }, [getAllQuizzes]);

  useEffect(() => {
    getCards();
  }, [getCards]);

  return {
    removeItem,
    cards,
    handleGoQuiz,
  };
};
