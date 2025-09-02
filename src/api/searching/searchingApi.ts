import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {
  ISearchingEntity,
  SearchingEntity,
  SearchingEntityResponse,
} from './entities/searchingEntity';
import {RootState} from '@/libraries/redux';
import {IResponse} from '@/interfaces/responseEntity';

export const searchingApi = createApi({
  reducerPath: EReducersPath.SEARCHING_API,
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
    getAllSearching: build.query<SearchingEntity[], void>({
      query: () => `${apiBase.endpoints.searchings}?limit=100`,
      transformResponse: (response: {items: SearchingEntity[]}) =>
        response.items,
    }),
    getAllSearchings: build.query<SearchingEntityResponse[], void>({
      query: () => `${apiBase.userBaseUrl}${apiBase.endpoints.getAllSearching}`,
      transformResponse: (response: IResponse<ISearchingEntity>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
        })),
    }),
  }),
});

export const {useGetAllSearchingQuery, useGetAllSearchingsQuery} = searchingApi;
