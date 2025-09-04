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
  ITypeVerseResponse,
  IVerseResponse,
} from "@/verse/data/remote/entities/verseEntity";
import {
  useFindTypeVerseByIdQuery,
  useLazyFindAllVerseByTypeVerseIdQuery,
} from "@/verse/data/remote/verseApi";

type ViewModelContextType = {
  dataTypeVerse: ITypeVerseResponse | undefined;
  itemsVerse: IVerseResponse[];
  loadingVerse: boolean;
  nameToSearch: string;
  verses: IResponse<IVerseResponse> | undefined;
  handleRefresh: () => Promise<void>;
  handleSearch: (text: string) => void;
  handleNextPageVerse: () => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const [itemsVerse, setItemsVerse] = useState<IVerseResponse[]>([]);
  const [nextToken, setNextToken] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nameToSearch, setNameToSearch] = useState("");
  const limit = 20;

  const { data: dataTypeVerse } = useFindTypeVerseByIdQuery(id);

  const [triggerVerses, { isLoading: loadingVerse, data: verses }] =
    useLazyFindAllVerseByTypeVerseIdQuery();

  const handleRefresh = useCallback(async () => {
    setNextToken("");
    const { data: dataVerse } = await triggerVerses({
      nameToSearch,
      limit,
      nextToken: "",
      typeVerseId: id,
    });
    if (dataVerse && dataVerse.data) {
      setItemsVerse(dataVerse.data);
      setNextToken(dataVerse.nextToken);
    }
  }, [id, nameToSearch, triggerVerses]);

  const handleSearch = useCallback((text: string) => {
    setNameToSearch(text);
  }, []);

  const handleNextPageVerse = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  useEffect(() => {
    const getData = async () => {
      const { data: dataVerse } = await triggerVerses({
        nameToSearch,
        limit,
        nextToken: "",
        typeVerseId: id,
      });

      if (dataVerse && dataVerse.data) {
        setItemsVerse(dataVerse.data);
        setNextToken(dataVerse.nextToken);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataVerse } = await triggerVerses({
          nameToSearch,
          limit,
          nextToken,
          typeVerseId: id,
        });

        if (dataVerse && dataVerse.data) {
          setItemsVerse((prevItems) => [...prevItems, ...dataVerse.data]);
          setNextToken(dataVerse.nextToken);
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
        dataTypeVerse,
        itemsVerse,
        loadingVerse,
        nameToSearch,
        verses,
        handleRefresh,
        handleSearch,
        handleNextPageVerse,
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
