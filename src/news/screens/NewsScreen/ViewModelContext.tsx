import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IResponse } from "@/core/interfaces/responseEntity";
import {
  INewsResponse,
  INewsTypeResponse,
} from "@/news/data/remote/entities/newsEntity";
import {
  useFindAllTypeNewsQuery,
  useLazyFindAllNewsQuery,
} from "@/news/data/remote/newsApi";

type ViewModelContextType = {
  news: IResponse<INewsResponse> | undefined;
  newsItems: INewsResponse[];
  isLoading: boolean;
  typeSelect: string | number;
  isLoadingTypes: boolean;
  newsCategories: INewsTypeResponse[];
  handleNextPage: () => void;
  handleRefetchNews: () => Promise<void>;
  handleSelectType: (item: number | string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const {
    data: dataTypeNews = [],
    isLoading: isLoadingTypes,
    refetch: handleRefetch,
  } = useFindAllTypeNewsQuery();
  const [triggerNews, { data: news, isLoading }] = useLazyFindAllNewsQuery();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [typeSelect, setTypeSelect] = useState<number | string>("all");
  const [newsItems, setNewsItems] = useState<INewsResponse[]>([]);
  const limit = 20;

  const newsCategories = [
    {
      id: "all",
      name: "All",
      erased: false,
    },
    ...dataTypeNews,
  ];

  const handleNextPage = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  const handleRefetchNews = useCallback(async () => {
    setNextToken("");
    handleRefetch();
    const { data: dataNews } = await triggerNews({
      limit,
      nextToken: "",
      typeNewsId: typeSelect,
    });
    if (dataNews && dataNews.data) {
      setNewsItems(dataNews.data);
      setNextToken(dataNews.nextToken);
    }
  }, [handleRefetch, triggerNews, typeSelect]);

  const handleSelectType = useCallback((item: number | string) => {
    setNextToken("");
    setTypeSelect(item);
  }, []);

  useEffect(() => {
    async function getData() {
      const { data: dataNews } = await triggerNews({
        nextToken: "",
        limit,
        typeNewsId: typeSelect,
      });

      if (dataNews && dataNews.data) {
        setNewsItems(dataNews.data);
        setNextToken(dataNews.nextToken);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataNews } = await triggerNews({
          limit,
          nextToken,
          typeNewsId: typeSelect,
        });

        if (dataNews && dataNews.data) {
          setNewsItems((prevItems) => [...prevItems, ...dataNews.data]);
          setNextToken(dataNews.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore, nextToken]);

  return (
    <ViewModelContext.Provider
      value={{
        news,
        newsItems,
        isLoading,
        typeSelect,
        isLoadingTypes,
        newsCategories,
        handleNextPage,
        handleRefetchNews,
        handleSelectType,
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
