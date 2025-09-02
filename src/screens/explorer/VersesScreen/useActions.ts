import {useState} from 'react';
import {useFindAllVerseQuery} from '@/api/typeVerse/typeVerseApi';

export const useActions = () => {
  const [searchText, setSearchText] = useState('');

  const {
    data: dataTypeVerse,
    refetch: handleRefreshTypeVerse,
    isLoading: loadingTypeVerse,
  } = useFindAllVerseQuery(searchText);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleRefresh = () => {
    handleRefreshTypeVerse();
  };

  return {
    dataTypeVerse,
    loadingTypeVerse,
    searchText,
    handleRefresh,
    handleSearch,
  };
};
