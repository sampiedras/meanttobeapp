import {useLazyFindAllArtistQuery} from '@/api/artist/artistApi';
import {IArtistResponse} from '@/api/artist/entities/artistEntity';
import {useFindAllSongsFilterQuery} from '@/api/song/songApi';
import {useFindAllSongGenreQuery} from '@/api/songGenre/songGenreApi';
import {useEffect, useState} from 'react';

export const useActions = () => {
  const [nameToSearch, setNameToSearch] = useState('');
  const [itemsArtist, setItemsArtist] = useState<IArtistResponse[]>([]);
  const [nextToken, setNextToken] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const limit = 20;

  const [triggerFindArtist, {isLoading: loadingArtist, data: artists}] =
    useLazyFindAllArtistQuery();

  const {
    data: songGenreData,
    isLoading: loadingSongGenre,
    refetch: handleRefreshSongGenre,
  } = useFindAllSongGenreQuery(nameToSearch);

  const {data: dataSongs} = useFindAllSongsFilterQuery(nameToSearch);

  const handleSearch = (text: string) => {
    setNameToSearch(text);
  };

  const handleRefresh = async () => {
    setNextToken('');
    handleRefreshSongGenre();
    const {data: dataArtist} = await triggerFindArtist({
      nameToSearch,
      limit,
      nextToken: '',
    });
    if (dataArtist && dataArtist.data) {
      setItemsArtist(dataArtist.data);
      setNextToken(dataArtist.nextToken);
    }
  };

  const handleNextPageArtist = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const {data: dataArtist} = await triggerFindArtist({
        nameToSearch,
        limit,
        nextToken: '',
      });

      if (dataArtist && dataArtist.data) {
        setItemsArtist(dataArtist.data);
        setNextToken(dataArtist.nextToken);
      }
    };

    getData();
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataArtist} = await triggerFindArtist({
          nameToSearch,
          limit,
          nextToken,
        });

        if (dataArtist && dataArtist.data) {
          setItemsArtist(prevItems => [...prevItems, ...dataArtist.data]);
          setNextToken(dataArtist.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken]);

  return {
    songGenreData,
    loadingSongGenre,
    nameToSearch,
    itemsArtist,
    dataSongs,
    loadingArtist,
    artists,
    handleRefresh,
    handleSearch,
    handleNextPageArtist,
  };
};
