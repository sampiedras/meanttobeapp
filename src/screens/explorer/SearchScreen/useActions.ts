import {useGetAllNewsFilterQuery} from '@/api/news/newsApi';
import {useGetAllQuizzesFilterQuery} from '@/api/quizzes/quizzesApi';
import {useGetAllSermonFilterQuery} from '@/api/sermon/sermonApi';
import {useGetAllSongsFilterQuery} from '@/api/song/songApi';
import {useGetAllVerseFilterQuery} from '@/api/verse/verseApi';
import {listButtonsNavigationExplorer} from '@/fakeDb/listButtonsNavigationExplorer';
import {RootStackRoutes, RootStackScreenProps} from '@/types/stackRoutes';
import {useState} from 'react';
import {Linking} from 'react-native';

export const useActionsSearch = ({
  navigation,
}: RootStackScreenProps<RootStackRoutes.SEARCH>) => {
  const [activeFragment, setActiveFragment] = useState<number>(0);
  const [searchText, setSearchText] = useState('');

  const {data: dataVerse} = useGetAllVerseFilterQuery(searchText);
  const {data: dataSermons} = useGetAllSermonFilterQuery(searchText);
  const {data: dataSongs} = useGetAllSongsFilterQuery(searchText);
  const {data: dataNews} = useGetAllNewsFilterQuery(searchText);
  const {data: dataQuizzes} = useGetAllQuizzesFilterQuery(searchText);

  const activeButtonWithAll = [
    {id: 0, title: 'All', route: 'All', color: '#FFFFFF'},
    ...listButtonsNavigationExplorer,
  ];

  const setButtonActive = (item: number) => {
    setActiveFragment(item);
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleDetailSong = (id: number, name: string, urlSong: string) => {
    navigation.navigate(RootStackRoutes.SONG_DETAIL, {
      id: id,
      name: name,
      ulrSong: urlSong,
    });
  };
  const handleDetailSermon = (
    id: number,
    title: string,
    urlYouTube: string,
  ) => {
    navigation.navigate(RootStackRoutes.SERMON_DETAIL, {
      id: id,
      title: title,
      urlYouTube: urlYouTube,
    });
  };
  const handleDetailNews = (newsUrl: string) => {
    Linking.openURL(newsUrl);
  };
  const handleDetailVerse = (
    id: number,
    text: string,
    verseQuote: string,
    img: string,
  ) => {
    navigation.navigate(RootStackRoutes.VERSES_DETAIL, {
      id: id,
      text: text,
      reference: verseQuote,
      img: img,
    });
  };

  const handleDetailQuiz = (id: number) => {
    navigation.navigate(RootStackRoutes.QUIZ_QUESTIONS, {
      quizId: id,
    });
  };

  return {
    activeFragment,
    setButtonActive,
    navigation,
    dataSongs,
    handleDetailSong,
    dataSermons,
    handleDetailSermon,
    dataNews,
    handleDetailNews,
    dataVerse,
    handleDetailVerse,
    dataQuizzes,
    handleDetailQuiz,
    onChangeText,
    searchText,
    listButtonsNavigationExplorer: activeButtonWithAll,
  };
};
