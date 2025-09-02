import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  IVerse,
  IVerseResponse,
  VerseEntity,
  VersesEntity,
} from './entities/VerseEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const verseApi = createApi({
  reducerPath: EReducersPath.VERSE_API,
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
    getAllVerse: build.query<VersesEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.verse}?limit=100&searchText=${searchText}`,
    }),
    getAllVersesByTypeVerseId: build.query<
      VersesEntity,
      {id: number; page: number; searchText: string}
    >({
      query: ({id, page, searchText}) =>
        `${apiBase.endpoints.verse}?limit=20&typeVerseId=${id}&searchText=${searchText}&page=${page}`,
    }),
    getVerseById: build.query<VerseEntity, number>({
      query: id => `${apiBase.endpoints.verseById}/${id}?limit=100`,
    }),

    // news endpoints
    getAllVerseFilter: build.query<VersesEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.verse}?limit=100&searchText=${searchText}`,
    }),
    findAllVerseByTypeVerseId: build.query<
      IResponse<IVerseResponse>,
      {
        nameToSearch: string;
        typeVerseId: string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({nameToSearch, typeVerseId, nextToken, limit}) =>
        `${apiBase.verseBaseUrl}${
          apiBase.endpoints.verses
        }?nameToSearch=${nameToSearch}&typeVerseId=${typeVerseId}&nextToken=${
          nextToken || ''
        }&limit=${limit}`,
      transformResponse: (response: IResponse<IVerse>) => ({
        ...response,  
        data: response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          img: e.img,
          shareImg: e.shareImg,
          verseQuote: e.verseQuote,
          typeVerseId: e.typeVerseId,
          typeVerse: e.typeVerse,
        })),
      }),
    }),
    findVerseById: build.query<IVerseResponse, string>({
      query: id => `${apiBase.verseBaseUrl}${apiBase.endpoints.verses}/${id}`,
      transformResponse: (response: IResponseObject<IVerseResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllVerseQuery,
  useGetVerseByIdQuery,
  useLazyGetAllVersesByTypeVerseIdQuery,
  useGetAllVerseFilterQuery,
  useFindAllVerseByTypeVerseIdQuery,
  useLazyFindAllVerseByTypeVerseIdQuery,
  useFindVerseByIdQuery,
} = verseApi;
