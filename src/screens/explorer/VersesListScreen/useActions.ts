import {useFindTypeVerseByIdQuery} from '@/api/typeVerse/typeVerseApi';
import {IVerseResponse} from '@/api/verse/entities/VerseEntity';
import {useLazyFindAllVerseByTypeVerseIdQuery} from '@/api/verse/verseApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useEffect, useState} from 'react';

export const useActions = (
  props: RootStackScreenProps<RootStackRoutes.VERSES_LIST>,
) => {
  const {route} = props;
  const [itemsVerse, setItemsVerse] = useState<IVerseResponse[]>([]);
  const [nextToken, setNextToken] = useState('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nameToSearch, setNameToSearch] = useState('');
  const limit = 20;

  const {data: dataTypeVerse} = useFindTypeVerseByIdQuery(route.params.id);

  const [triggerVerses, {isLoading: loadingVerse, data: verses}] =
    useLazyFindAllVerseByTypeVerseIdQuery();

  useEffect(() => {
    const getData = async () => {
      const {data: dataVerse} = await triggerVerses({
        nameToSearch,
        limit,
        nextToken: '',
        typeVerseId: route.params.id,
      });

      if (dataVerse && dataVerse.data) {
        setItemsVerse(dataVerse.data);
        setNextToken(dataVerse.nextToken);
      }
    };

    getData();
  }, [nameToSearch]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataVerse} = await triggerVerses({
          nameToSearch,
          limit,
          nextToken,
          typeVerseId: route.params.id,
        });

        if (dataVerse && dataVerse.data) {
          setItemsVerse(prevItems => [...prevItems, ...dataVerse.data]);
          setNextToken(dataVerse.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken]);

  const handleRefresh = async () => {
    setNextToken('');
    const {data: dataVerse} = await triggerVerses({
      nameToSearch,
      limit,
      nextToken: '',
      typeVerseId: route.params.id,
    });
    if (dataVerse && dataVerse.data) {
      setItemsVerse(dataVerse.data);
      setNextToken(dataVerse.nextToken);
    }
  };

  const handleSearch = (text: string) => {
    setNameToSearch(text);
  };

  const handleNextPageVerse = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  return {
    dataTypeVerse,
    itemsVerse,
    loadingVerse,
    nameToSearch,
    verses,
    handleRefresh,
    handleSearch,
    handleNextPageVerse,
  };
};
