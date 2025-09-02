import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from '@/api/bible/entities/bibleEntity';
import {useGetAllQuestionQuery} from '@/api/question/questionApi';
import {QuestionEntity} from '@/api/question/entities/questionEntity';
import {
  useLazyGetBooksByIdQuery,
  useLazyGetChapterByIdQuery,
  useLazyGetPassagesByOriginQuery,
  useLazyGetVerseByIdQuery,
} from '@/api/bible/bibleApi';
import {
  useGetUserQuestionProfileQuery,
  useUpdateUserQuestionsMutation,
} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {userAlertMessage} from '@/hooks/useAlertMessage';

export const useActionsQuestions = (
  props: RootStackScreenProps<RootStackRoutes.QUESTIONS>,
) => {
  const {navigation} = props;
  const {showErrorMessage, showSuccessMessage} = userAlertMessage();
  const {user, checkUserIsAuth} = useAuthProvider();
  const {data: dataQuestion = []} = useGetAllQuestionQuery();
  const [triggerGetPassage, {data: dataPassage}] =
    useLazyGetPassagesByOriginQuery();
  const {data: userQuestion, refetch: questionsRefetch} =
    useGetUserQuestionProfileQuery();
  const [triggerGetBookById] = useLazyGetBooksByIdQuery();
  const [triggerGetChapterById] = useLazyGetChapterByIdQuery();
  const [triggerGetVerseById] = useLazyGetVerseByIdQuery();
  const [handleUpdateUserQuestion] = useUpdateUserQuestionsMutation();

  const [selectedBook, setSelectedBook] = useState<BooksEntity | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterEntity | null>(
    null,
  );
  const [selectedVerse, setSelectedVerse] = useState<VerseEntity | null>(null);
  const [data, setData] = useState<QuestionEntity[]>([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionEntity | null>(null);
  const [loading, setLoading] = useState(false);

  const [modalAnswer, setModalAnswer] = useState<boolean>(false);
  const [modalSelectQuestion, setModalSelectQuestion] =
    useState<boolean>(false);

  useEffect(() => {
    getAllDataToPut();
  }, [dataQuestion, user]);

  const getAllDataToPut = async () => {
    try {
      const questionWithId1 = userQuestion?.find(a => a.question?.id === 1);

      if (questionWithId1?.answer.split('&')[0]) {
        const result = await triggerGetPassage(
          questionWithId1?.answer.split('&')[0],
        ).unwrap();
        const resultBook = await triggerGetBookById(result.bookId);
        setSelectedBook(resultBook?.data && resultBook?.data?.data);

        const resultChapter = await triggerGetChapterById(result.chapterIds);
        setSelectedChapter(resultChapter?.data && resultChapter?.data?.data);

        const resultVerse = await triggerGetVerseById(result.orgId);
        setSelectedVerse(resultVerse?.data && resultVerse?.data?.data);
      }
    } catch (error) {
      showErrorMessage('Error to put data into');
    }
  };

  const toggleModalAnswer = (item: QuestionEntity) => {
    setModalAnswer(!modalAnswer);
    setSelectedQuestion(item);
  };

  const toggleModalSelectQuestion = () => {
    setModalSelectQuestion(!modalSelectQuestion);
  };

  const handleSavePassage = async () => {
    setModalSelectQuestion(false);
    const newData = data.map((item: QuestionEntity) =>
      item.id === 1
        ? {
            ...item,
            answer: `${dataPassage.id}&${
              dataPassage?.content?.split(' [')[1].split('] ')[1]
            }`,
          }
        : item,
    );
    setData(newData);
  };

  const handleGetAnswer = async (answer: string) => {
    setModalAnswer(false);
    const newData = data.map((item: QuestionEntity) =>
      item.id === selectedQuestion?.id ? {...item, answer} : item,
    );
    setData(newData);
  };

  useEffect(() => {
    const questions = userQuestion?.filter(
      q => q.question?.id === q.question?.id,
    );
    if (dataQuestion.length > 0 && questions && questions.length > 0) {
      const mergedData = dataQuestion.map(question => {
        const matchingQuestion =
          questions && questions.find(q => q.question?.id === question.id);
        if (matchingQuestion) {
          return {
            ...question,
            answer: matchingQuestion.answer || '',
          };
        }
        return {
          ...question,
          answer: '',
        };
      });
      setData(mergedData);
    }
  }, [dataQuestion, userQuestion]);

  const updateQuestion = async () => {
    try {
      setLoading(true);
      const body = {
        questions: data.filter(question => question.answer),
      };
      await handleUpdateUserQuestion(body);
      showSuccessMessage('Updated questions successfully');
      setLoading(false);
      questionsRefetch();
      checkUserIsAuth();
      navigation.pop();
    } catch (error) {
      showErrorMessage('An error occurred while updating');
    }
  };

  return {
    selectedBook,
    selectedChapter,
    selectedVerse,
    data,
    setSelectedBook,
    setSelectedChapter,
    setSelectedVerse,
    setData,
    toggleModalAnswer,
    modalSelectQuestion,
    dataPassage,
    handleSavePassage,
    triggerGetPassage,
    modalAnswer,
    setModalAnswer,
    selectedQuestion,
    handleGetAnswer,
    toggleModalSelectQuestion,
    userQuestion,
    updateQuestion,
    loading,
  };
};
