import {ReactNode, useCallback, useEffect, useState} from 'react';
import Share from 'react-native-share';
import {
  useGetQuestionByQuizIdQuery,
  useLazyGetTrendingTagsQuery,
} from '@/api/quizzes/quizzesApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {TagEntity} from '@/api/quizzes/entities/quizzesEntity';
import {Platform} from 'react-native';

export const useActions = (
  quiz: string,
  quizId: string,
  {navigation}: RootStackScreenProps<RootStackRoutes.QUIZ_QUESTIONS>,
  headerRight: (onPress: () => void) => ReactNode,
) => {
  const {data: quizQuestions = []} = useGetQuestionByQuizIdQuery(quizId);
  const [getTagsByAnswers, {data: tags = []}] = useLazyGetTrendingTagsQuery();

  const count = quizQuestions.length;

  const [cards, setCards] = useState(quizQuestions);
  const [current, setCurrent] = useState(0);
  const [answerTags, setAnswerTags] = useState<string[]>([]);

  const removeItem = useCallback(
    async (tagId: string) => {
      await setAnswerTags(prev => [...prev, tagId]);

      setCards(prev => prev.slice(1));
      setCurrent(prev => prev + 1);
    },
    [setAnswerTags, setCards, setCurrent],
  );

  const setShareOption = useCallback(async (tags: TagEntity[]) => {
    const response = await fetch(tags[0].img);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === 'string') {
        const base64 = dataUrl.split(',')[1];

        navigation.setOptions({
          headerRight: () =>
            headerRight(() =>
              Share.open({
                message: `I am a${
                  tags[0]?.name.split('')[0] === 'a' ? 'n' : ''
                } ${
                  tags[0]?.name
                }! Join me by completing the ${quiz} quiz in Meant to Be app. Download the App Now\n\n${
                  Platform.OS === 'ios'
                    ? 'https://apps.apple.com/co/app/meant-to-be/id6463029847'
                    : 'https://play.google.com/store/apps/details?id=com.meanttobe&pli=1'
                }`,
                url: `data:image/jpeg;base64,${base64}`,
              }),
            ),
        });
      }
    };
    reader.readAsDataURL(blob);
  }, []);

  const resolveData = useCallback(async () => {
    try {
      const {data} = await getTagsByAnswers(answerTags);
      if (data && data.length) {
        setShareOption(data);
      } else {
        console.warn('No data returned from getTagsByAnswers');
      }
    } catch (error) {
      console.error('Error fetching tags by answers:', error);
    }
    navigation.setOptions({headerTitle: 'Result'});
  }, [answerTags, getTagsByAnswers, navigation]);

  useEffect(() => {
    if (current === count && count > 0) {
      resolveData();
    }
  }, [current, count, resolveData]);

  useEffect(() => {
    if (quizQuestions.length > 0) {
      setCards(quizQuestions);
    }
  }, [quizQuestions]);

  return {removeItem, cards, current, tags, quizQuestions, quiz, count};
};
