import {ReactNode, useEffect} from 'react';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useFindVerseByIdQuery} from '@/api/verse/verseApi';
import {useGetVerseReferenceByIdQuery} from '@/api/bible/bibleApi';
import Share from 'react-native-share';
import {Platform} from 'react-native';

export const useActions = (
  {route, navigation}: RootStackScreenProps<RootStackRoutes.VERSES_DETAIL>,
  headerRight: (onPress: () => void) => ReactNode,
) => {
  const {data: verseData} = useFindVerseByIdQuery(route.params.id);

  const {data: verseReference} = useGetVerseReferenceByIdQuery(
    verseData?.verseQuote.split('&')[0] || '',
  );

  useEffect(() => {
    const handleShare = async () => {
      if (verseData && verseData?.shareImg) {
        const response = await fetch(verseData?.shareImg);

        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          if (typeof dataUrl === 'string') {
            const base64 = dataUrl.split(',')[1];

            navigation.setOptions({
              headerRight: () =>
                headerRight(() =>
                  Share.open({
                    message: `${verseData.name}\n\n${
                      verseReference?.reference
                    }\n\n${
                      Platform.OS === 'ios'
                        ? 'https://apps.apple.com/co/app/meant-to-be/id6463029847'
                        : 'https://play.google.com/store/apps/details?id=com.meanttobe&pli=1'
                    }`,
                    url: `data:image/jpeg;base64,${base64}`,
                  }),
                ),
            });
          }
        };
        reader.readAsDataURL(blob);
      }
    };
    handleShare();
  }, []);

  return {
    verseData,
    verseReference,
  };
};
