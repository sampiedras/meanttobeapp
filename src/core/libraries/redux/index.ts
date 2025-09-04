import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { bibleApi } from "@/core/data/remote/bibleApi";
import { mediaApi, putMediaApi } from "@/core/data/remote/mediaApi";
import loading from "@/core/slices/loadingSlice";
import match from "@/core/slices/matchSlice";
import tabBar from "@/core/slices/tabBarSlice";
import user from "@/core/slices/userSlice";
import { newsApi } from "@/news/data/remote/newsApi";
import { quizApi } from "@/quiz/data/remote/quizApi";
import { sermonApi } from "@/sermon/data/remote/sermonApi";
import { songApi } from "@/song/data/remote/songApi";
import { userApi } from "@/user/data/remote/userApi";
import { verseApi } from "@/verse/data/remote/verseApi";
import alertPremium from "../../slices/alertPremiumSlice";
import filters from "../../slices/filtersSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["filters"],
};

const rootReducer = {
  user,
  loading,
  tabBar,
  filters,
  alertPremium,
  match,
  [userApi.reducerPath]: userApi.reducer,
  [songApi.reducerPath]: songApi.reducer,
  [verseApi.reducerPath]: verseApi.reducer,
  [sermonApi.reducerPath]: sermonApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
  [putMediaApi.reducerPath]: putMediaApi.reducer,
  [bibleApi.reducerPath]: bibleApi.reducer,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      songApi.middleware,
      verseApi.middleware,
      sermonApi.middleware,
      quizApi.middleware,
      newsApi.middleware,
      mediaApi.middleware,
      putMediaApi.middleware,
      bibleApi.middleware,
    ]),
  devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export { store, persistor };
