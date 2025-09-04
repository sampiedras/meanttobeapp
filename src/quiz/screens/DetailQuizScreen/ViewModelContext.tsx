import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import Share from "react-native-share";
import { TouchableOpacity } from "react-native-ui-lib";
import { colorsLight } from "@/core/theme";
import { QuizQuestionsType } from "@/quiz/data/remote/entities/quiestionEntity";
import { TagEntity } from "@/quiz/data/remote/entities/tagEntity";
import {
  useGetQuestionByQuizIdQuery,
  useLazyGetTrendingTagsQuery,
} from "@/quiz/data/remote/quizApi";

type ViewModelContextType = {
  tags: TagEntity[];
  count: number;
  current: number;
  cards: QuizQuestionsType;
  answerTags: string[];
  dataQuestions: QuizQuestionsType;
  removeItem: (tagId: string) => Promise<void>;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({
  id,
  quizName,
  children,
}: {
  id: string;
  quizName: string;
  children: ReactNode;
}) {
  const { setOptions } = useNavigation();
  const { data: dataQuestions = [] } = useGetQuestionByQuizIdQuery(id);
  const [getTagsByAnswers, { data: tags = [] }] = useLazyGetTrendingTagsQuery();

  const count = dataQuestions.length;

  const [cards, setCards] = useState<QuizQuestionsType>([]);
  const [current, setCurrent] = useState(0);
  const [answerTags, setAnswerTags] = useState<string[]>([]);

  const removeItem = useCallback(
    async (tagId: string) => {
      await setAnswerTags((prev) => [...prev, tagId]);

      setCards((prev) => prev.slice(1));
      setCurrent((prev) => prev + 1);
    },
    [setAnswerTags, setCards, setCurrent],
  );

  const setShareOption = useCallback(
    async (tagsProps: TagEntity[]) => {
      const response = await fetch(tagsProps[0].img);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        if (typeof dataUrl === "string") {
          const base64 = dataUrl.split(",")[1];

          setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Share.open({
                    message: `I am a${
                      tags[0]?.name.split("")[0] === "a" ? "n" : ""
                    } ${
                      tags[0]?.name
                    }! Join me by completing the ${quizName} quiz in Meant to Be app. Download the App Now\n\n${
                      Platform.OS === "ios"
                        ? "https://apps.apple.com/co/app/meant-to-be/id6463029847"
                        : "https://play.google.com/store/apps/details?id=com.meanttobe&pli=1"
                    }`,
                    url: `data:image/jpeg;base64,${base64}`,
                  });
                }}
              >
                <Text color={colorsLight.PRIMARY_COLOR} style={styles.text}>
                  Share
                </Text>
              </TouchableOpacity>
            ),
          });
        }
      };
      reader.readAsDataURL(blob);
    },
    [quizName, setOptions, tags],
  );

  const resolveData = useCallback(async () => {
    try {
      const { data } = await getTagsByAnswers(answerTags);
      if (data && data.length) {
        setShareOption(data);
      } else {
        console.warn("No data returned from getTagsByAnswers");
      }
    } catch (error) {
      console.error("Error fetching tags by answers:", error);
    }
    setOptions({ headerTitle: "Result" });
  }, [answerTags, getTagsByAnswers, setOptions, setShareOption]);

  useEffect(() => {
    if (current === count && count > 0) {
      resolveData();
    }
  }, [current, count, resolveData]);

  useEffect(() => {
    if (dataQuestions.length > 0) {
      setCards(dataQuestions);
    }
  }, [dataQuestions]);

  return (
    <ViewModelContext.Provider
      value={{
        tags,
        count,
        cards,
        current,
        answerTags,
        dataQuestions,
        removeItem,
      }}
    >
      {children}
    </ViewModelContext.Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
    marginRight: Platform.OS === "ios" ? 18 : 16,
  },
});

export function useViewModelProvider() {
  const context = useContext(ViewModelContext);
  if (context === undefined) {
    throw new Error("Publication View Model Provider");
  }
  return context;
}
