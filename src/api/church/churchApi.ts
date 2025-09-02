import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ChurchEntity,
  IChurchEntity,
  ResponseChurchEntity,
} from './entities/ChurchEntity';
import {IResponse} from '@/interfaces/responseEntity';

export const churchApi = createApi({
  reducerPath: EReducersPath.CHURCH_API,
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
    getAllChurch: build.query<ChurchEntity[], string>({
      query: text => `${apiBase.endpoints.church}?limit=100&searchText=${text}`,
      transformResponse: (response: {items: ChurchEntity[]}) => response.items,
    }),
    getAllChurches: build.query<ResponseChurchEntity[], void>({
      query: () => `${apiBase.userBaseUrl}${apiBase.endpoints.getAllChurch}`,
      transformResponse: (response: IResponse<IChurchEntity>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
        })),
    }),
  }),
});

export const {useLazyGetAllChurchQuery, useLazyGetAllChurchesQuery} = churchApi;
