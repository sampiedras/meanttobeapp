import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseBible } from "@/core/constants/api";
import { EReducersPath } from "@/core/enums";
import { RootState } from "@/core/libraries/redux";
import { API_BIBLE_BASE, API_KEY_BIBLE } from "@/core/utils/config";
import {
  BooksEntity,
  ChapterEntity,
  VerseEntity,
} from "./entities/bibleEntity";

export const bibleApi = createApi({
  reducerPath: EReducersPath.BIBLE_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BIBLE_BASE,
    timeout: 30 * 1000,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      );
      headers.set("api-key", API_KEY_BIBLE);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBooksByBibleId: build.query<BooksEntity[], void>({
      query: () => `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/books`,
      transformResponse: (response: { data: BooksEntity[] }) => response.data,
    }),
    getBooksById: build.query<BooksEntity, string>({
      query: (id) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/books/${id}`,
    }),
    getChapterByBookId: build.query<ChapterEntity[], string>({
      query: (bookId) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/books/${bookId}/chapters`,
      transformResponse: (response: { data: ChapterEntity[] }) => response.data,
    }),
    getChapterById: build.query<ChapterEntity, string>({
      query: (id) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/chapters/${id}`,
    }),
    getVerseByBookId: build.query<VerseEntity[], string>({
      query: (chapterId) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/chapters/${chapterId}/verses`,
      transformResponse: (response: { data: VerseEntity[] }) => response.data,
    }),
    getVerseById: build.query<VerseEntity, string>({
      query: (id) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/verses/${id}`,
    }),
    getPassagesByOrigin: build.query<any, string>({
      query: (origin) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/passages/${origin}?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getVerseReferenceById: build.query<VerseEntity, string>({
      query: (verseId) =>
        `${apiBaseBible.endpoints.bibles}/de4e12af7f28f599-01/verses/${verseId}`,
      transformResponse: (response: { data: VerseEntity }) => response.data,
    }),
  }),
});

export const {
  useGetBooksByBibleIdQuery,
  useLazyGetBooksByIdQuery,
  useLazyGetChapterByBookIdQuery,
  useLazyGetChapterByIdQuery,
  useLazyGetVerseByBookIdQuery,
  useLazyGetVerseByIdQuery,
  useLazyGetPassagesByOriginQuery,
  useGetVerseReferenceByIdQuery,
  useLazyGetVerseReferenceByIdQuery,
} = bibleApi;
