import {
  useFindSermonByIdQuery,
  useGetSermonByIdQuery,
} from '@/api/sermon/sermonApi';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {format, parseISO} from 'date-fns';
import {useCallback, useEffect, useState} from 'react';

export const useActionsSermonDetail = (
  props: RootStackScreenProps<RootStackRoutes.SERMON_DETAIL>,
) => {
  const {route} = props;
  const {data: dataSermonById} = useFindSermonByIdQuery(route.params.id);
  console.log('dataSermonById @@@@@@@@@@@@@', dataSermonById);

  const [playing, setPlaying] = useState(false);
  const [formatDate, setFormatDate] = useState('');

  const handlePress = () => {
    setPlaying(true);
  };

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:\?v=|\/embed\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/d\/)([^?&"'>]+)/,
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const getYouTubeThumbnailUrl = (videoId: string | null) => {
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  };

  const youTubeUrl = dataSermonById?.urlYouTube;
  const videoId = getYouTubeVideoId(youTubeUrl ? youTubeUrl : '');
  const imageUrl = getYouTubeThumbnailUrl(videoId);

  useEffect(() => {
    if (dataSermonById?.creationDate) {
      const date = parseISO(dataSermonById?.creationDate);
      const desiredformat = 'MMMM dd yyyy';
      const formatDate = format(date, desiredformat);
      setFormatDate(formatDate);
    }
  }, [dataSermonById]);

  return {
    playing,
    formatDate,
    handlePress,
    onStateChange,
    videoId,
    imageUrl,
    dataSermonById,
  };
};
