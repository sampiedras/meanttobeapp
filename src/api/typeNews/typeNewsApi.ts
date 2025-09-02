import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';

import {RootState} from '@/libraries/redux';
import {
  INewsType,
  INewsTypeResponse,
  NewsTypesEntity,
} from './entities/typeNewsEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const typeNewsApi = createApi({
  reducerPath: EReducersPath.TYPE_NEWS_API,
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
    getAllNewsTypes: build.query<NewsTypesEntity[], void>({
      query: () => `${apiBase.endpoints.typeNews}?limit=100`,
      transformResponse: (response: {items: NewsTypesEntity[]}) =>
        response.items,
    }),
    findAllTypeNews: build.query<INewsTypeResponse[], void>({
      query: () => `${apiBase.newsBaseUrl}${apiBase.endpoints.newsType}`,
      transformResponse: (response: IResponse<INewsType>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          erased: e.erased,
        })),
    }),
  }),
});

export const {useGetAllNewsTypesQuery, useFindAllTypeNewsQuery} = typeNewsApi;
