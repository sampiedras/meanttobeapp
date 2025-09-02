import {useEffect, useState} from 'react';
import {
  useGetTopSermonsQuery,
  useLazyFindAllSermonsQuery,
} from '@/api/sermon/sermonApi';
import {useFindTypeSermonQuery} from '@/api/typeSermon/typeSermonApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {ISermonResponse} from '@/api/sermon/entities/sermonEntity';

export const useActionsSermons = ({
  navigation: {navigate},
}: RootStackScreenProps<RootStackRoutes.SERMONS>) => {
  const {data: dataTopSermon} = useGetTopSermonsQuery();
  const [nextToken, setNextToken] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [typeSelect, setTypeSelect] = useState<string | number>('all');
  const [sermonItems, setSermonItems] = useState<ISermonResponse[]>([]);
  const limit = 20;
  const [triggerSermon, {isLoading, data: dataSermon}] =
    useLazyFindAllSermonsQuery();

  const {data: dataTypeSermon = [], isLoading: loadingTypeSermon} =
    useFindTypeSermonQuery();
  const typeSermonWithAll = [{id: 'all', name: 'All'}, ...dataTypeSermon];

  useEffect(() => {
    const getData = async () => {
      const {data: dataArtist} = await triggerSermon({
        typeSermonId: typeSelect,
        limit,
        nextToken: '',
      });

      if (dataArtist && dataArtist.data) {
        setSermonItems(dataArtist.data);
        setNextToken(dataArtist.nextToken);
      }
    };
    getData();
  }, [typeSelect]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataArtist} = await triggerSermon({
          limit,
          nextToken,
          typeSermonId: typeSelect,
        });

        if (dataArtist && dataArtist.data) {
          setSermonItems(prevItems => [...prevItems, ...dataArtist.data]);
          setNextToken(dataArtist.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken]);

  const handleNextPage = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  const handleRefetchSermon = async () => {
    setNextToken('');
    const {data: dataArtist} = await triggerSermon({
      limit,
      nextToken: '',
      typeSermonId: typeSelect,
    });
    if (dataArtist && dataArtist.data) {
      setSermonItems(dataArtist.data);
      setNextToken(dataArtist.nextToken);
    }
  };

  const handleSelectType = (item: string | number) => {
    setNextToken('');
    setTypeSelect(item);
  };

  const handleNavigateDetail = (sermonId: string) => {
    navigate(RootStackRoutes.SERMON_DETAIL, {
      id: sermonId,
    });
  };

  return {
    sermonItems,
    dataTopSermon,
    dataSermon,
    dataTypeSermon: typeSermonWithAll,
    isLoading,
    typeSelect,
    loadingTypeSermon,
    handleNextPage,
    handleRefetchSermon,
    handleSelectType,
    handleNavigateDetail,
  };
};
