import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IResponse } from "@/core/interfaces/responseEntity";
import { IArtistResponse } from "@/song/data/remote/entities/artistEntity";
import {
  ISongGenreResponse,
  ISongResponse,
} from "@/song/data/remote/entities/songEntity";
import {
  useFindSongGenreByIdQuery,
  useLazyFindArtistByGenreIdQuery,
  useLazyFindSongByIdGenreQuery,
} from "@/song/data/remote/songApi";

type ViewModelContextType = {
  dataGenre: ISongGenreResponse | undefined;
  songs: IResponse<ISongResponse> | undefined;
  artists: IResponse<IArtistResponse> | undefined;
  loadingSong: boolean;
  loadingArtist: boolean;
  itemsSong: any[];
  itemsArtist: any[];
  nameToSearch: string;
  handleRefresh: () => Promise<void>;
  handleSearch: (text: string) => void;
  handleNextPageSong: () => void;
  handleNextPageArtist: () => void;
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
  const { data: dataGenre } = useFindSongGenreByIdQuery(id);

  const [triggerSongs, { isLoading: loadingSong, data: songs }] =
    useLazyFindSongByIdGenreQuery();

  const [triggerArtist, { isLoading: loadingArtist, data: artists }] =
    useLazyFindArtistByGenreIdQuery();

  const [nameToSearch, setNameToSearch] = useState("");
  const [itemsSong, setItemsSong] = useState<any[]>([]);
  const [itemsArtist, setItemsArtist] = useState<any[]>([]);
  const [nextToken, setNextToken] = useState("");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isFetchingMoreArtist, setIsFetchingMoreArtist] = useState(false);
  const [nextTokenArtist, setNextTokenArtist] = useState("");
  const limit = 20;

  const handleRefresh = useCallback(async () => {
    setNextToken("");
    const { data: dataSong } = await triggerSongs({
      nameToSearch,
      limit,
      nextToken: "",
      songGenderId: id,
    });
    if (dataSong && dataSong.data) {
      setItemsSong(dataSong.data);
      setNextToken(dataSong.nextToken);
    }

    setNextToken("");
    const { data: dataArtist } = await triggerArtist({
      nameToSearch,
      limit,
      nextToken: "",
      songGenderId: id,
    });
    if (dataArtist && dataArtist.data) {
      setItemsArtist(dataArtist.data);
      setNextTokenArtist(dataArtist.nextToken);
    }
  }, [id, nameToSearch, triggerArtist, triggerSongs]);

  const handleSearch = useCallback((text: string) => {
    setNameToSearch(text);
  }, []);

  const handleNextPageSong = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  const handleNextPageArtist = useCallback(() => {
    if (nextTokenArtist && !isFetchingMoreArtist) {
      setIsFetchingMoreArtist(true);
    }
  }, [isFetchingMoreArtist, nextTokenArtist]);

  useEffect(() => {
    async function getData() {
      const { data: dataSong } = await triggerSongs({
        nameToSearch,
        songGenderId: id,
        nextToken: "",
        limit,
      });

      if (dataSong && dataSong.data) {
        setItemsSong(dataSong.data);
        setNextToken(dataSong.nextToken);
      }

      const { data: dataArtist } = await triggerArtist({
        nameToSearch,
        songGenderId: id,
        nextToken: "",
        limit,
      });

      if (dataArtist && dataArtist.data) {
        setItemsArtist(dataArtist.data);
        setNextTokenArtist(dataArtist.nextToken);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataSong } = await triggerSongs({
          nameToSearch,
          limit,
          nextToken,
          songGenderId: id,
        });

        if (dataSong && dataSong.data) {
          setItemsSong((prevItems) => [...prevItems, ...dataSong.data]);
          setNextToken(dataSong.nextToken);
        }
        setIsFetchingMore(false);

        const { data: dataArtist } = await triggerArtist({
          nameToSearch,
          limit,
          nextToken,
          songGenderId: id,
        });

        if (dataArtist && dataArtist.data) {
          setItemsArtist((prevItems) => [...prevItems, ...dataArtist.data]);
          setNextTokenArtist(dataArtist.nextToken);
        }
        setIsFetchingMoreArtist(false);
      };

      getMoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchingMore, nextToken, nextTokenArtist, isFetchingMoreArtist]);

  return (
    <ViewModelContext.Provider
      value={{
        songs,
        dataGenre,
        artists,
        loadingSong,
        loadingArtist,
        itemsSong,
        itemsArtist,
        nameToSearch,
        handleRefresh,
        handleSearch,
        handleNextPageSong,
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
