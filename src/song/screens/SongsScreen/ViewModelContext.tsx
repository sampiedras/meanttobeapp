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
import { IArtistResponse } from "@/song/data/remote/entities/artistEntity";
import {
  ISongGenreResponse,
  ISongResponse,
} from "@/song/data/remote/entities/songEntity";
import {
  useFindAllSongGenreQuery,
  useFindAllSongsFilterQuery,
  useLazyFindAllArtistQuery,
} from "@/song/data/remote/songApi";
import { E_SongStackRoutes } from "@/song/routes";

type ViewModelContextType = {
  itemsArtist: any[];
  dataSongs: IResponse<ISongResponse> | undefined;
  artists: IResponse<IArtistResponse> | undefined;
  songGenreData: ISongGenreResponse[] | undefined;
  foundSearch: boolean;
  nameToSearch: string;
  loadingArtist: boolean;
  loadingSongGenre: boolean;
  handleSearch: (text: string) => void;
  handleRefresh: () => Promise<void>;
  handleNextPageArtist: () => void;
  handleNavigate: (itemId: string) => void;
};

const ViewModelContext = createContext<ViewModelContextType | undefined>(
  undefined,
);

export function ViewModelProvider({ children }: { children: ReactNode }) {
  const { navigate } = useNavigation();
  const [nameToSearch, setNameToSearch] = useState("");
  const [itemsArtist, setItemsArtist] = useState<any[]>([]);
  const [nextToken, setNextToken] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [foundSearch, setFoundSearch] = useState(false);
  const limit = 20;

  const [triggerFindArtist, { isLoading: loadingArtist, data: artists }] =
    useLazyFindAllArtistQuery();

  const {
    data: songGenreData,
    isLoading: loadingSongGenre,
    refetch: handleRefreshSongGenre,
  } = useFindAllSongGenreQuery(nameToSearch);

  const { data: dataSongs } = useFindAllSongsFilterQuery(nameToSearch);

  const handleSearch = useCallback((text: string) => {
    setNameToSearch(text);
  }, []);

  const handleRefresh = useCallback(async () => {
    setNextToken("");
    handleRefreshSongGenre();
    const { data: dataArtist } = await triggerFindArtist({
      nameToSearch,
      limit,
      nextToken: "",
    });
    if (dataArtist && dataArtist.data) {
      setItemsArtist(dataArtist.data);
      setNextToken(dataArtist.nextToken);
    }
  }, [handleRefreshSongGenre, nameToSearch, triggerFindArtist]);

  const handleNextPageArtist = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  const handleNavigate = useCallback(
    (itemId: string) => {
      navigate(E_SongStackRoutes.DETAIL_SONG_GENRE, {
        id: itemId,
      });
    },
    [navigate],
  );

  useEffect(() => {
    const getData = async () => {
      const { data: dataArtist } = await triggerFindArtist({
        nameToSearch,
        limit,
        nextToken: "",
      });

      if (dataArtist && dataArtist.data) {
        setItemsArtist(dataArtist.data);
        setNextToken(dataArtist.nextToken);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataArtist } = await triggerFindArtist({
          nameToSearch,
          limit,
          nextToken,
        });

        if (dataArtist && dataArtist.data) {
          setItemsArtist((prevItems) => [...prevItems, ...dataArtist.data]);
          setNextToken(dataArtist.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore, nextToken]);

  useEffect(() => {
    if (
      songGenreData?.length === 0 &&
      itemsArtist.length === 0 &&
      dataSongs?.data.length === 0
    ) {
      setFoundSearch(false);
    } else {
      setFoundSearch(true);
    }
  }, [dataSongs?.data, itemsArtist?.length, songGenreData?.length]);

  return (
    <ViewModelContext.Provider
      value={{
        artists,
        dataSongs,
        songGenreData,
        itemsArtist,
        foundSearch,
        nameToSearch,
        loadingArtist,
        loadingSongGenre,
        handleSearch,
        handleRefresh,
        handleNavigate,
        handleNextPageArtist,
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
