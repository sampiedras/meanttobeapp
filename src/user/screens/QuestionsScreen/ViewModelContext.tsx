import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuthProvider } from "@/core/context/AuthContext";
import {
  useLazyGetBooksByIdQuery,
  useLazyGetChapterByIdQuery,
  useLazyGetPassagesByOriginQuery,
  useLazyGetVerseByIdQuery,
} from "@/core/data/remote/bibleApi";
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from "@/core/data/remote/entities/bibleEntity";
import {
  IQuestionResponse,
  UserQuestion,
} from "@/user/data/remote/entities/questionEntity";
import { UserUpdateQuestionBodyType } from "@/user/data/remote/entities/userEntity";
import {
  useFindAllQuestionsQuery,
  useGetQuestionByUserIdQuery,
  useUpdateUserQuestionsMutation,
} from "@/user/data/remote/userApi";

type ViewModelContextType = {
  data: IQuestionResponse[];
  selectedBook: BooksEntity | null;
  selectedChapter: ChapterEntity | null;
  selectedVerse: VerseEntity | null;
  modalAnswer: boolean;
  dataPassage: any;
  modalSelectQuestion: boolean;
  selectedQuestion: IQuestionResponse | null;
  triggerGetPassage: any;
  isLoading: boolean;
  isFetching: boolean;
  toggleModalSelectQuestion: () => void;
  handleSavePassage: () => Promise<void>;
  handleGetAnswer: (answer: string) => Promise<void>;
  toggleModalAnswer: (item: IQuestionResponse) => void;
  setSelectedBook: React.Dispatch<React.SetStateAction<BooksEntity | null>>;
  setSelectedChapter: React.Dispatch<
    React.SetStateAction<ChapterEntity | null>
  >;
  setSelectedVerse: React.Dispatch<React.SetStateAction<VerseEntity | null>>;
  setModalAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  setDataPassage: React.Dispatch<any>;
  handleUpdateQuestion: () => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { goBack } = useNavigation();
  const { userProfile, handleUserUpdateInfo } = useAuthProvider();

  const {
    data: dataQuestions = [],
    refetch,
    isSuccess,
  } = useGetQuestionByUserIdQuery(userProfile?.userId || "");
  const [triggerGetPassage, { data: dataPass }] =
    useLazyGetPassagesByOriginQuery();
  const { data: questionData, isFetching } = useFindAllQuestionsQuery();
  const [triggerGetBookById] = useLazyGetBooksByIdQuery();
  const [triggerGetChapterById] = useLazyGetChapterByIdQuery();
  const [triggerGetVerseById] = useLazyGetVerseByIdQuery();
  const [handleUpdateUserQuestionApi, { isLoading }] =
    useUpdateUserQuestionsMutation();

  const [selectedQuestion, setSelectedQuestion] =
    useState<IQuestionResponse | null>(null);
  const [data, setData] = useState<IQuestionResponse[]>([]);
  const [modalAnswer, setModalAnswer] = useState<boolean>(false);
  const [modalSelectQuestion, setModalSelectQuestion] =
    useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BooksEntity | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterEntity | null>(
    null,
  );
  const [selectedVerse, setSelectedVerse] = useState<VerseEntity | null>(null);
  const [dataPassage, setDataPassage] = useState<any>(null);

  const toggleModalAnswer = (item: IQuestionResponse) => {
    setModalAnswer(!modalAnswer);
    setSelectedQuestion(item);
  };

  const toggleModalSelectQuestion = () => {
    setModalSelectQuestion(!modalSelectQuestion);
  };

  const handleSavePassage = async () => {
    setModalSelectQuestion(false);
    const newData = data.map((item: IQuestionResponse) =>
      item.question.trim() === "My favorite bible verse is"
        ? {
            ...item,
            answer: `${dataPassage.id}&${
              dataPassage?.content?.split(" [")[1].split("] ")[1]
            }`,
          }
        : item,
    );
    setData(newData);
  };

  const handleGetAnswer = async (answer: string) => {
    setModalAnswer(false);
    const newData = data.map((item: IQuestionResponse) =>
      item.id === selectedQuestion?.id ? { ...item, answer } : item,
    );
    setData(newData);
  };

  const handleUpdateQuestion = useCallback(async () => {
    try {
      const userQuestion: UserQuestion[] = data
        .filter(
          (question) =>
            question.answer &&
            question.question !== "My favorite bible verse is",
        )
        .map((e) => ({
          questionId: e.sk.split("#")[1],
          question: e.question,
          answer: e.answer || "",
        }));

      const verse = data
        .find((question) => question?.question === "My favorite bible verse is")
        ?.answer?.toString();
      const body: UserUpdateQuestionBodyType = {
        verse: verse || "",
        userQuestion,
        userQuestionToDeleteIds: dataQuestions.map((question) => question.pk),
      };
      await handleUpdateUserQuestionApi(body);
      await refetch();
      await handleUserUpdateInfo();
      Toast.show({
        type: "success",
        text1: "Questions updated successfully",
        visibilityTime: 2000,
      });
      goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error getting data from server",
        visibilityTime: 2000,
      });
    }
  }, [
    data,
    dataQuestions,
    goBack,
    handleUpdateUserQuestionApi,
    handleUserUpdateInfo,
    refetch,
  ]);

  useEffect(() => {
    if (questionData && questionData?.length > 0 && isSuccess) {
      setData(
        questionData.map((item) => {
          if (item.question === "My favorite bible verse is") {
            return { ...item, answer: userProfile?.verse };
          } else {
            const itemData = dataQuestions.find(
              (questionItem) => questionItem?.sk === item?.sk?.split("#")[1],
            );
            return { ...item, answer: itemData ? itemData.answer : "" };
          }
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, questionData]);

  useEffect(() => {
    if (userProfile?.verse) {
      (async () => {
        try {
          const result = await triggerGetPassage(
            userProfile.verse.split("&")[0],
          ).unwrap();
          const resultBook = await triggerGetBookById(result?.bookId).unwrap();
          setSelectedBook(resultBook.data);
          const resultChapter: any = await triggerGetChapterById(
            result?.chapterIds[0],
          );
          setSelectedChapter(resultChapter.data.data);
          const resultVerse: any = await triggerGetVerseById(
            userProfile.verse.split("&")[0],
          );
          setSelectedVerse(resultVerse?.data.data);
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error getting data from server",
            visibilityTime: 2000,
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataPass) {
      setDataPassage(dataPass);
    }
  }, [dataPass]);

  return (
    <ViewModelContext.Provider
      value={{
        data,
        isLoading,
        isFetching,
        selectedBook,
        selectedChapter,
        selectedVerse,
        modalAnswer,
        modalSelectQuestion,
        dataPassage,
        selectedQuestion,
        setSelectedBook,
        setSelectedChapter,
        setSelectedVerse,
        setModalAnswer,
        setDataPassage,
        handleGetAnswer,
        handleSavePassage,
        toggleModalSelectQuestion,
        toggleModalAnswer,
        triggerGetPassage,
        handleUpdateQuestion,
      }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
