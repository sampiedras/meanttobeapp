import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ITypeVerse,
  ITypeVerseResponse,
  TypeVerseEntity,
  TypeVersesEntity,
} from './entities/TypeVerseEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const typeVerseApi = createApi({
  reducerPath: EReducersPath.TYPE_VERSE_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    timeout: 30 * 1000,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      );
      return headers;
    },
  }),

  endpoints: build => ({
    getAllTypeVerse: build.query<TypeVersesEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.typeVerse}?limit=100&searchText=${searchText}`,
    }),

    getTypeVerseById: build.query<TypeVerseEntity, number>({
      query: id => `${apiBase.endpoints.typeVerseById}/${id}?limit=100`,
    }),

    // news endpoints

    findAllVerse: build.query<ITypeVerseResponse[], string>({
      query: nameToSearch =>
        `${apiBase.verseBaseUrl}${apiBase.endpoints.typeVerses}?nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ITypeVerse>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          coverImg: e.coverImg,
        })),
    }),

    findTypeVerseById: build.query<ITypeVerseResponse, string>({
      query: typeVerseId =>
        `${apiBase.verseBaseUrl}${apiBase.endpoints.typeVerses}/${typeVerseId}`,
      transformResponse: (response: IResponseObject<ITypeVerseResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllTypeVerseQuery,
  useGetTypeVerseByIdQuery,
  useFindAllVerseQuery,
  useFindTypeVerseByIdQuery,
} = typeVerseApi;
