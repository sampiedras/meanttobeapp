import {useEffect, useState} from 'react';
import {useLazyFindAllNewsQuery} from '@/api/news/newsApi';
import {useFindAllTypeNewsQuery} from '@/api/typeNews/typeNewsApi';
import {INewsResponse} from '@/api/news/entities/newsEntity';

export const useActionsNews = () => {
  const {
    data: dataTypeNews = [],
    isLoading: isLoadingTypes,
    refetch: handleRefetch,
  } = useFindAllTypeNewsQuery();
  const [triggerNews, {data: news, isLoading}] = useLazyFindAllNewsQuery();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [nextToken, setNextToken] = useState('');
  const [typeSelect, setTypeSelect] = useState<number | string>('all');
  const [newsItems, setNewsItems] = useState<INewsResponse[]>([]);
  const limit = 20;

  const newsCategories = [
    {
      id: 'all',
      name: 'All',
      erased: false,
    },
    ...dataTypeNews,
  ];

  const handleNextPage = () => {
    if (nextToken && !isFetchingMore) {
      setIsFetchingMore(true);
    }
  };

  const handleRefetchNews = async () => {
    setNextToken('');
    handleRefetch();
    const {data: dataNews} = await triggerNews({
      limit,
      nextToken: '',
      typeNewsId: typeSelect,
    });
    if (dataNews && dataNews.data) {
      setNewsItems(dataNews.data);
      setNextToken(dataNews.nextToken);
    }
  };

  const handleSelectType = (item: number | string) => {
    setNextToken('');
    setTypeSelect(item);
  };

  useEffect(() => {
    async function getData() {
      const {data: dataNews} = await triggerNews({
        nextToken: '',
        limit,
        typeNewsId: typeSelect,
      });

      if (dataNews && dataNews.data) {
        setNewsItems(dataNews.data);
        setNextToken(dataNews.nextToken);
      }
    }
    getData();
  }, [typeSelect]);

  useEffect(() => {
    if (isFetchingMore && nextToken) {
      const getMoreData = async () => {
        const {data: dataNews} = await triggerNews({
          limit,
          nextToken,
          typeNewsId: typeSelect,
        });

        if (dataNews && dataNews.data) {
          setNewsItems(prevItems => [...prevItems, ...dataNews.data]);
          setNextToken(dataNews.nextToken);
        }
        setIsFetchingMore(false);
      };

      getMoreData();
    }
  }, [isFetchingMore, nextToken]);

  return {
    news,
    newsItems,
    isLoading,
    typeSelect,
    isLoadingTypes,
    newsCategories,
    handleNextPage,
    handleRefetchNews,
    handleSelectType,
  };
};
