import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { IResponse } from "@/core/interfaces/responseEntity";
import {
  ISermonResponse,
  ITypeSermonResponse,
} from "@/sermon/data/remote/entities/sermonEntity";
import {
  useFindTypeSermonQuery,
  useLazyFindAllSermonsQuery,
} from "@/sermon/data/remote/sermonApi";
import { E_SermonStackRoutes } from "@/sermon/routes";

type ViewModelContextType = {
  sermonItems: ISermonResponse[];
  dataSermon: IResponse<ISermonResponse> | undefined;
  dataTypeSermon: ITypeSermonResponse[];
  isLoading: boolean;
  typeSelect: string | number;
  loadingTypeSermon: boolean;
  handleNextPage: () => void;
  handleRefetchSermon: () => Promise<void>;
  handleSelectType: (item: string | number) => void;
  handleNavigateDetail: (sermonId: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const limit = 20;
  const { navigate } = useNavigation();

  const [triggerSermon, { isLoading, data: dataSermon }] =
    useLazyFindAllSermonsQuery();

  const { data: dataTypeSermon = [], isLoading: loadingTypeSermon } =
    useFindTypeSermonQuery();

  const [nextToken, setNextToken] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [typeSelect, setTypeSelect] = useState<string | number>("all");
  const [sermonItems, setSermonItems] = useState<ISermonResponse[]>([]);

  const handleRefetchSermon = useCallback(async () => {
    setNextToken("");
    const { data: dataArtist } = await triggerSermon({
      limit,
      nextToken: "",
      typeSermonId: typeSelect,
    });
    if (dataArtist && dataArtist.data) {
      setSermonItems(dataArtist.data);
      setNextToken(dataArtist.nextToken);
    }
  }, [triggerSermon, typeSelect]);

  const handleSelectType = useCallback((item: string | number) => {
    setNextToken("");
    setTypeSelect(item);
  }, []);

  const handleNavigateDetail = useCallback(
    (sermonId: string) => {
      navigate(E_SermonStackRoutes.DETAIL_SERMON, {
        id: sermonId,
      });
    },
    [navigate],
  );

  const handleNextPage = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  useEffect(() => {
    const getData = async () => {
      const { data: dataArtist } = await triggerSermon({
        typeSermonId: typeSelect,
        limit,
        nextToken: "",
      });

      if (dataArtist && dataArtist.data) {
        setSermonItems(dataArtist.data);
        setNextToken(dataArtist.nextToken);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataArtist } = await triggerSermon({
          limit,
          nextToken,
          typeSermonId: typeSelect,
        });

        if (dataArtist && dataArtist.data) {
          setSermonItems((prevItems) => [...prevItems, ...dataArtist.data]);
          setNextToken(dataArtist.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore, nextToken]);

  const typeSermonWithAll = [{ id: "all", name: "All" }, ...dataTypeSermon];

  return (
    <ViewModelContext.Provider
      value={{
        sermonItems,
        dataSermon,
        dataTypeSermon: typeSermonWithAll,
        isLoading,
        typeSelect,
        loadingTypeSermon,
        handleNextPage,
        handleRefetchSermon,
        handleSelectType,
        handleNavigateDetail,
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
