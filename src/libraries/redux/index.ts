import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import user from '@/slices/userSlice';
import loading from '@/slices/loadingSlice';
import itsMatch from '@/slices/itsMatchSlice';
import tabBar from '@/slices/tabBarSlice';
import {userApi} from '@/api/user/userApi';
import {searchingApi} from '@/api/searching/searchingApi';
import {churchApi} from '@/api/church/churchApi';
import {beginningApi} from '@/api/beginning/beginningApi';
import {socialCauseApi} from '@/api/socialCause/socialCauseApi';
import {ministryApi} from '@/api/ministry/ministryApi';
import {questionApi} from '@/api/question/questionApi';
import {bibleApi} from '@/api/bible/bibleApi';
import {driveApi} from '@/api/drive/driveApi';
import {sermonApi} from '@/api/sermon/sermonApi';
import {typeSermonApi} from '@/api/typeSermon/typeSermonApi';
import {newsApi} from '@/api/news/newsApi';
import {songApi} from '@/api/song/songApi';
import {artistApi} from '@/api/artist/artistApi';
import {songGenreApi} from '@/api/songGenre/songGenreApi';
import {typeVerseApi} from '@/api/typeVerse/typeVerseApi';
import {explorerRandomApi} from '@/api/explorerRandom/explorerRandomApi';
import {typeNewsApi} from '@/api/typeNews/typeNewsApi';
import {verseApi} from '@/api/verse/verseApi';
import {quizzesApi} from '@/api/quizzes/quizzesApi';
import {purchaseApi} from '@/api/purchase/purchaseApi';
import {explorerRecentAddedApi} from '@/api/explorerRecentAdded/explorerRecentAddedApi';
import {matchApi} from '@/api/match/matchApi';
import tutorialMatch from '@/slices/tutorialMatchSlice';
import itsMatchTutorial from '@/slices/itsMatchTutorialSlice';
import filters from '@/slices/filtersSlice';
import alertPremium from '@/slices/alertPremiumSlice';
import {mediaApi} from '@/api/media/mediaApi';

const store = configureStore({
  reducer: {
    user,
    loading,
    tabBar,
    itsMatch,
    tutorialMatch,
    itsMatchTutorial,
    filters,
    alertPremium,
    [userApi.reducerPath]: userApi.reducer,
    [searchingApi.reducerPath]: searchingApi.reducer,
    [churchApi.reducerPath]: churchApi.reducer,
    [beginningApi.reducerPath]: beginningApi.reducer,
    [socialCauseApi.reducerPath]: socialCauseApi.reducer,
    [ministryApi.reducerPath]: ministryApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [bibleApi.reducerPath]: bibleApi.reducer,
    [driveApi.reducerPath]: driveApi.reducer,
    [sermonApi.reducerPath]: sermonApi.reducer,
    [typeSermonApi.reducerPath]: typeSermonApi.reducer,
    [typeNewsApi.reducerPath]: typeNewsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [songApi.reducerPath]: songApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [songGenreApi.reducerPath]: songGenreApi.reducer,
    [typeVerseApi.reducerPath]: typeVerseApi.reducer,
    [verseApi.reducerPath]: verseApi.reducer,
    [explorerRandomApi.reducerPath]: explorerRandomApi.reducer,
    [quizzesApi.reducerPath]: quizzesApi.reducer,
    [explorerRecentAddedApi.reducerPath]: explorerRecentAddedApi.reducer,
    [matchApi.reducerPath]: matchApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      searchingApi.middleware,
      churchApi.middleware,
      beginningApi.middleware,
      socialCauseApi.middleware,
      ministryApi.middleware,
      questionApi.middleware,
      bibleApi.middleware,
      driveApi.middleware,
      sermonApi.middleware,
      typeSermonApi.middleware,
      newsApi.middleware,
      songApi.middleware,
      artistApi.middleware,
      songGenreApi.middleware,
      typeVerseApi.middleware,
      explorerRandomApi.middleware,
      explorerRecentAddedApi.middleware,
      typeNewsApi.middleware,
      verseApi.middleware,
      quizzesApi.middleware,
      matchApi.middleware,
      purchaseApi.middleware,
      mediaApi.middleware,
    ]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
