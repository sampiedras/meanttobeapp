import {useGetExplorerRandomQuery} from '@/api/explorerRandom/explorerRandomApi';
import {useGetExplorerRecentAddedQuery} from '@/api/explorerRecentAdded/explorerRecentAddedApi';
import {useGetAllFavoritesQuery} from '@/api/user/userApi';

export const useActionsExplorer = () => {
  const {data: dataRandom, refetch: refetchRandom} =
    useGetExplorerRandomQuery();

  const {data: dataRecentAdded, refetch: refetchRecentAdded} =
    useGetExplorerRecentAddedQuery();

  const {data: dataFavorite, refetch: refetchFavorite} =
    useGetAllFavoritesQuery();

  return {
    dataRandom,
    dataRecentAdded,
    dataFavorite,
    refetchRandom,
    refetchRecentAdded,
    refetchFavorite,
  };
};
