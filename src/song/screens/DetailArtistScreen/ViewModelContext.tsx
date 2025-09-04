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
import { ISongResponse } from "@/song/data/remote/entities/songEntity";
import {
  useFinArtistByIQuery,
  useLazyFindSongByArtistIdQuery,
} from "@/song/data/remote/songApi";

type ViewModelContextType = {
  artistData: IArtistResponse | undefined;
  loadingSong: boolean;
  itemsSong: any[];
  songs: IResponse<ISongResponse> | undefined;
  handleNextPageSong: () => void;
  handleRefresh: () => Promise<void>;
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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextToken, setNextToken] = useState("");
  const [itemsSong, setItemsSong] = useState<any[]>([]);
  const { data: artistData } = useFinArtistByIQuery(id);
  const [triggerSongs, { isLoading: loadingSong, data: songs }] =
    useLazyFindSongByArtistIdQuery();
  const limit = 20;

  const handleNextPageSong = useCallback(() => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  }, [isFetchingMore, nextToken]);

  const handleRefresh = useCallback(async () => {
    setNextToken("");
    const { data: dataSong } = await triggerSongs({
      limit,
      nextToken: "",
      artistId: id,
    });
    if (dataSong && dataSong.data) {
      setItemsSong(dataSong.data);
      setNextToken(dataSong.nextToken);
    }
  }, [id, triggerSongs]);

  useEffect(() => {
    async function getData() {
      const { data: dataSong } = await triggerSongs({
        artistId: id,
        nextToken: "",
        limit,
      });

      if (dataSong && dataSong.data) {
        setItemsSong(dataSong.data);
        setNextToken(dataSong.nextToken);
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const { data: dataSong } = await triggerSongs({
          limit,
          nextToken,
          artistId: id,
        });

        if (dataSong && dataSong.data) {
          setItemsSong((prevItems) => [...prevItems, ...dataSong.data]);
          setNextToken(dataSong.nextToken);
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
        artistData,
        loadingSong,
        songs,
        itemsSong,
        handleNextPageSong,
        handleRefresh,
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
