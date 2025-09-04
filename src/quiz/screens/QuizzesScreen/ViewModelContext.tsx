import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { QuizEntity } from "@/quiz/data/remote/entities/quizEntity";
import { useLazyGetAllQuizzesQuery } from "@/quiz/data/remote/quizApi";
import { E_QuizStackRoutes } from "@/quiz/routes";

type ViewModelContextType = {
  cards: QuizEntity[];
  isFetching: boolean;
  handleRemoveItem: () => void;
  handleGoQuiz: (quiz: string, quizId: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const [getAllQuizzes, { data: { nextToken = "" } = {}, isFetching }] =
    useLazyGetAllQuizzesQuery();

  const [cards, setCards] = useState<QuizEntity[]>([]);

  const handleGoQuiz = useCallback(
    (quiz: string, quizId: string) => {
      navigate(E_QuizStackRoutes.DETAIL_QUIZ, {
        id: quizId,
        quizName: quiz,
      });
    },
    [navigate],
  );

  const handleRemoveItem = useCallback(() => {
    setCards((prevCards) => {
      return prevCards.slice(1);
    });
  }, []);

  const getCards = useCallback(async () => {
    const { data: { data: dataQuiz = [] } = {} } = await getAllQuizzes({
      nameToSearch: "",
      limit: 10,
      nextToken: nextToken || "",
    });

    setCards(dataQuiz);
  }, [getAllQuizzes, nextToken]);

  useEffect(() => {
    if (cards.length === 0) {
      getCards();
    }
  }, [cards.length, getCards, nextToken]);

  return (
    <ViewModelContext.Provider
      value={{
        cards,
        isFetching,
        handleRemoveItem,
        handleGoQuiz,
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
