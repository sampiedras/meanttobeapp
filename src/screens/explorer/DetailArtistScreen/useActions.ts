import {useFinArtistByIQuery} from '@/api/artist/artistApi';
import {ISongResponse} from '@/api/song/entities/songEntity';
import {useLazyFindSongByArtistIdQuery} from '@/api/song/songApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';

export const useActions = (
  props: RootStackScreenProps<RootStackRoutes.ARTIST_DETAIL>,
) => {
  const {route} = props;
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextToken, setNextToken] = useState('');
  const [itemsSong, setItemsSong] = useState<ISongResponse[]>([]);
  const {data: artistData} = useFinArtistByIQuery(route.params.id);
  const [triggerSongs, {isLoading: loadingSong, data: songs}] =
    useLazyFindSongByArtistIdQuery();
  const limit = 20;

  const handleNextPageSong = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  const handleRefresh = async () => {
    setNextToken('');
    const {data: dataSong} = await triggerSongs({
      limit,
      nextToken: '',
      artistId: route.params.id,
    });
    if (dataSong && dataSong.data) {
      setItemsSong(dataSong.data);
      setNextToken(dataSong.nextToken);
    }
  };

  useEffect(() => {
    async function getData() {
      const {data: dataSong} = await triggerSongs({
        artistId: route.params.id,
        nextToken: '',
        limit,
      });

      if (dataSong && dataSong.data) {
        setItemsSong(dataSong.data);
        setNextToken(dataSong.nextToken);
      }
    }
    getData();
  }, [route.params.id]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataSong} = await triggerSongs({
          limit,
          nextToken,
          artistId: route.params.id,
        });

        if (dataSong && dataSong.data) {
          setItemsSong(prevItems => [...prevItems, ...dataSong.data]);
          setNextToken(dataSong.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken]);

  return {
    artistData,
    loadingSong,
    songs,
    itemsSong,
    handleNextPageSong,
    handleRefresh,
  };
};
