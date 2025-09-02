import {Linking, useWindowDimensions} from 'react-native';

export const useActionsCard = () => {
  const {width} = useWindowDimensions();

  const handleGoToDetail = async (newsUrl: string) => {
    Linking.openURL(newsUrl);
  };

  return {
    width,
    handleGoToDetail,
  };
};
