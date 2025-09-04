import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import to from "await-to-js";
import { orderData } from "@/explorer/utils/orderData";
import {
  useLazyGetAllNewsToExplorerQuery,
  useLazyGetAllRecentNewsQuery,
} from "@/news/data/remote/newsApi";
import { E_QuizStackRoutes } from "@/quiz";
import {
  useLazyGetAllQuizByLikeQuery,
  useLazyGetAllQuizFavoriteQuery,
} from "@/quiz/data/remote/quizApi";
import { E_SermonStackRoutes } from "@/sermon";
import {
  useLazyGetAllRecentSermonsQuery,
  useLazyGetAllSermonByLikeQuery,
  useLazyGetAllSermonsFavoriteQuery,
  useLazyGetAllSermonToExplorerQuery,
} from "@/sermon/data/remote/sermonApi";
import { E_SongStackRoutes } from "@/song";
import {
  useLazyGetAllRecentSongsQuery,
  useLazyGetAllSongsByLikeQuery,
  useLazyGetAllSongsFavoriteQuery,
  useLazyGetAllSongsToExplorerQuery,
} from "@/song/data/remote/songApi";
import { E_VerseStackRoutes } from "@/verse";
import {
  useLazyGetAllRecentVerseQuery,
  useLazyGetAllVersesToExplorerQuery,
} from "@/verse/data/remote/verseApi";

export type DataCarouselType = {
  sk: string;
  name: string;
  type: string;
};

type ViewModelContextType = {
  currentIndex: number;
  refreshing: boolean;
  data: DataCarouselType[];
  dataByLike: DataCarouselType[];
  dataRecent: DataCarouselType[];
  dataFavorite: DataCarouselType[];
  isLoading: boolean;
  isLoadingSectionLike: boolean;
  isLoadingSectionRecent: boolean;
  isLoadingSectionFavorite: boolean;
  carouselRef: React.MutableRefObject<any>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
  handleNavigate: (
    key: string,
    id: string,
    newsUrl?: string,
    name: string,
  ) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const carouselRef = useRef<any>(null);

  const [triggerGetAllSong] = useLazyGetAllSongsToExplorerQuery();
  const [triggerGetAllSermon] = useLazyGetAllSermonToExplorerQuery();
  const [triggerGetAllNews] = useLazyGetAllNewsToExplorerQuery();
  const [triggerGetAllVerse] = useLazyGetAllVersesToExplorerQuery();

  // Get all by like
  const [triggerGetAllSongByLike] = useLazyGetAllSongsByLikeQuery();
  const [triggerGetAllSermonByLike] = useLazyGetAllSermonByLikeQuery();
  const [triggerGetAllQuizByLike] = useLazyGetAllQuizByLikeQuery();

  // Get all recent
  const [triggerGetAllRecentSongs] = useLazyGetAllRecentSongsQuery();
  const [triggerGetAllRecentSermons] = useLazyGetAllRecentSermonsQuery();
  const [triggerGetAllRecentNews] = useLazyGetAllRecentNewsQuery();
  const [triggerGetAllRecentVerse] = useLazyGetAllRecentVerseQuery();

  // Get all favorites
  const [triggerGetAllSongFavorite] = useLazyGetAllSongsFavoriteQuery();
  const [triggerGetAllSermonFavorite] = useLazyGetAllSermonsFavoriteQuery();
  const [triggerGetAllQuizFavorite] = useLazyGetAllQuizFavoriteQuery();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSectionLike, setIsLoadingSectionLike] = useState(true);
  const [isLoadingSectionRecent, setIsLoadingSectionRecent] = useState(true);
  const [isLoadingSectionFavorite, setIsLoadingSectionFavorite] =
    useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<DataCarouselType[]>([]);
  const [dataByLike, setDataByLike] = useState<DataCarouselType[]>([]);
  const [dataRecent, setDataRecent] = useState<DataCarouselType[]>([]);
  const [dataFavorite, setDataFavorite] = useState<DataCarouselType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetAllData = useCallback(
    async (text: string) => {
      try {
        setIsLoading(true);
        const [errorSong, resultSong] = await to(
          triggerGetAllSong(text).unwrap(),
        );
        const [errorVerse, resultVerse] = await to(
          triggerGetAllVerse(text).unwrap(),
        );
        const [errorSermon, resultSermon] = await to(
          triggerGetAllSermon(text).unwrap(),
        );
        const [errorNews, resultNews] = await to(
          triggerGetAllNews(text).unwrap(),
        );

        const newData = [
          ...orderData("song", !errorSong ? resultSong : []),
          ...orderData("verse", !errorVerse ? resultVerse : []),
          ...orderData("sermon", !errorSermon ? resultSermon : []),
          ...orderData("news", !errorNews ? resultNews : []),
        ];
        setData(newData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error -> handleGetAllData", error);
      }
    },
    [
      triggerGetAllNews,
      triggerGetAllSermon,
      triggerGetAllSong,
      triggerGetAllVerse,
    ],
  );

  const handleGetAllDataByLike = useCallback(async () => {
    try {
      setIsLoadingSectionLike(true);
      const [errorSong, resultSong] = await to(
        triggerGetAllSongByLike().unwrap(),
      );
      const [errorSermon, resultSermon] = await to(
        triggerGetAllSermonByLike().unwrap(),
      );
      const [errorQuiz, resultQuiz] = await to(
        triggerGetAllQuizByLike().unwrap(),
      );

      const newData = [
        ...orderData("song", !errorSong ? resultSong : []),
        ...orderData("sermon", !errorSermon ? resultSermon : []),
        ...orderData("quiz", !errorQuiz ? resultQuiz : []),
      ];
      setDataByLike(newData);
      setIsLoadingSectionLike(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoadingSectionLike(false);
    }
  }, [
    triggerGetAllQuizByLike,
    triggerGetAllSermonByLike,
    triggerGetAllSongByLike,
  ]);

  const handleGetAllRecentData = useCallback(async () => {
    try {
      setIsLoadingSectionRecent(true);

      const [errorSong, resultSong] = await to(
        triggerGetAllRecentSongs().unwrap(),
      );
      const [errorSermon, resultSermon] = await to(
        triggerGetAllRecentSermons().unwrap(),
      );
      const [errorNews, resultNews] = await to(
        triggerGetAllRecentNews().unwrap(),
      );
      const [errorVerse, resultVerse] = await to(
        triggerGetAllRecentVerse().unwrap(),
      );

      const newData = [
        ...orderData("song", !errorSong ? resultSong : []),
        ...orderData("sermon", !errorSermon ? resultSermon : []),
        ...orderData("news", !errorNews ? resultNews : []),
        ...orderData("verse", !errorVerse ? resultVerse : []),
      ];
      setDataRecent(newData);
      setIsLoadingSectionRecent(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoadingSectionRecent(false);
    }
  }, [
    triggerGetAllRecentNews,
    triggerGetAllRecentSermons,
    triggerGetAllRecentSongs,
    triggerGetAllRecentVerse,
  ]);

  const handleGetAllDataFavorite = useCallback(async () => {
    try {
      const [errorSong, resultSong] = await to(
        triggerGetAllSongFavorite().unwrap(),
      );
      const [errorSermon, resultSermon] = await to(
        triggerGetAllSermonFavorite().unwrap(),
      );
      const [errorQuiz, resultQuiz] = await to(
        triggerGetAllQuizFavorite().unwrap(),
      );

      const newData = [
        ...orderData("song", !errorSong ? resultSong : []),
        ...orderData("sermon", !errorSermon ? resultSermon : []),
        ...orderData("quiz", !errorQuiz ? resultQuiz : []),
      ];
      setDataFavorite(newData);
      setIsLoadingSectionFavorite(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoadingSectionFavorite(false);
    }
  }, [
    triggerGetAllQuizFavorite,
    triggerGetAllSermonFavorite,
    triggerGetAllSongFavorite,
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([
      handleGetAllData(searchText),
      handleGetAllDataByLike(),
      handleGetAllRecentData(),
      handleGetAllDataFavorite(),
    ]);
    setRefreshing(false);
  };

  const handleNavigate = useCallback(
    (key: string, id: string, newsUrl: string = "", name: string = "") => {
      switch (key) {
        case "song":
          navigate(E_SongStackRoutes.DETAIL_SONG, {
            id: id.split("#")[1],
          });
          break;
        case "sermon":
          navigate(E_SermonStackRoutes.DETAIL_SERMON, {
            id: id.split("#")[1],
          });
          break;
        case "quiz":
          navigate(E_QuizStackRoutes.DETAIL_QUIZ, {
            id: id.split("#")[1],
            quizName: name,
          });
          break;
        case "news":
          Linking.openURL(newsUrl);
          break;
        case "verse":
          navigate(E_VerseStackRoutes.DETAIL_VERSE, {
            id: id.split("#")[1],
          });
          break;

        default:
          break;
      }
    },
    [navigate],
  );

  useEffect(() => {
    Promise.all([
      handleGetAllData(searchText),
      handleGetAllDataByLike(),
      handleGetAllRecentData(),
      handleGetAllDataFavorite(),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewModelContext.Provider
      value={{
        data,
        isLoading,
        dataByLike,
        dataRecent,
        dataFavorite,
        refreshing,
        carouselRef,
        currentIndex,
        isLoadingSectionLike,
        isLoadingSectionRecent,
        isLoadingSectionFavorite,
        setCurrentIndex,
        setRefreshing,
        onRefresh,
        handleNavigate,
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
