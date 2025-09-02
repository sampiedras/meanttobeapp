import {
  useLazyFindArtistByGenreIdQuery,
  useLazyGetArtistByGenereIdQuery,
} from '@/api/artist/artistApi';
import {IArtistResponse} from '@/api/artist/entities/artistEntity';
import {ISongResponse} from '@/api/song/entities/songEntity';
import {
  useLazyFindSongByIdGenreQuery,
  useLazyGetSongsByGenreIdQuery,
} from '@/api/song/songApi';
import {
  useFindSongGenreByIdQuery,
  // useGetSongGenreByIdQuery,
} from '@/api/songGenre/songGenreApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';

export const useActions = (
  props: RootStackScreenProps<RootStackRoutes.SONG_GENRE_DETAIL>,
) => {
  const {route} = props;
  const {data: dataGenre} = useFindSongGenreByIdQuery(route.params.id);

  const [triggerSongs, {isLoading: loadingSong, data: songs}] =
    useLazyFindSongByIdGenreQuery();

  const [triggerArtist, {isLoading: loadingArtist, data: artists}] =
    useLazyFindArtistByGenreIdQuery();

  const [nameToSearch, setNameToSearch] = useState('');
  const [itemsSong, setItemsSong] = useState<ISongResponse[]>([]);
  const [itemsArtist, setItemsArtist] = useState<IArtistResponse[]>([]);
  const [nextToken, setNextToken] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isFetchingMoreArtist, setIsFetchingMoreArtist] = useState(false);
  const [nextTokenArtist, setNextTokenArtist] = useState('');
  const limit = 20;

  const handleRefresh = async () => {
    setNextToken('');
    const {data: dataSong} = await triggerSongs({
      nameToSearch,
      limit,
      nextToken: '',
      songGenderId: route.params.id,
    });
    if (dataSong && dataSong.data) {
      setItemsSong(dataSong.data);
      setNextToken(dataSong.nextToken);
    }

    setNextToken('');
    const {data: dataArtist} = await triggerArtist({
      nameToSearch,
      limit,
      nextToken: '',
      songGenderId: route.params.id,
    });
    if (dataArtist && dataArtist.data) {
      setItemsArtist(dataArtist.data);
      setNextTokenArtist(dataArtist.nextToken);
    }
  };

  const handleSearch = (text: string) => {
    setNameToSearch(text);
  };

  const handleNextPageSong = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  const handleNextPageArtist = () => {
    if (nextTokenArtist && !isFetchingMoreArtist) {
      setIsFetchingMoreArtist(true);
    }
  };

  useEffect(() => {
    async function getData() {
      const {data: dataSong} = await triggerSongs({
        nameToSearch,
        songGenderId: route.params.id,
        nextToken: '',
        limit,
      });

      if (dataSong && dataSong.data) {
        setItemsSong(dataSong.data);
        setNextToken(dataSong.nextToken);
      }

      const {data: dataArtist} = await triggerArtist({
        nameToSearch,
        songGenderId: route.params.id,
        nextToken: '',
        limit,
      });

      if (dataArtist && dataArtist.data) {
        setItemsArtist(dataArtist.data);
        setNextTokenArtist(dataArtist.nextToken);
      }
    }
    getData();
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataSong} = await triggerSongs({
          nameToSearch,
          limit,
          nextToken,
          songGenderId: route.params.id,
        });

        if (dataSong && dataSong.data) {
          setItemsSong(prevItems => [...prevItems, ...dataSong.data]);
          setNextToken(dataSong.nextToken);
        }
        setIsFetchingMore(false);

        const {data: dataArtist} = await triggerArtist({
          nameToSearch,
          limit,
          nextToken,
          songGenderId: route.params.id,
        });

        if (dataArtist && dataArtist.data) {
          setItemsArtist(prevItems => [...prevItems, ...dataArtist.data]);
          setNextTokenArtist(dataArtist.nextToken);
        }
        setIsFetchingMoreArtist(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken, nextTokenArtist, isFetchingMoreArtist]);

  return {
    dataSongGenre: dataGenre,
    artist: artists,
    itemsSong,
    loadingSong,
    loadingArtist,
    searchText: nameToSearch,
    songs,
    itemsArtist,
    handleSearch,
    handleRefresh,
    handleNextPageSong,
    handleNextPageArtist,
  };
};
