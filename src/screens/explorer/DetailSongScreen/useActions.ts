import {useFindSongByIdQuery, useGetSongByIdQuery} from '@/api/song/songApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';

export const useActions = (
  props: RootStackScreenProps<RootStackRoutes.SONG_DETAIL>,
) => {
  const {route} = props;
  const {data} = useFindSongByIdQuery(route.params.id);
  return {data};
};
