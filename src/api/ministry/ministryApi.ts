import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {MinistryEntity} from './entities/ministryEntity';

export const ministryApi = createApi({
  reducerPath: EReducersPath.MINISTRY_API,
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
    getAllMinistry: build.query<MinistryEntity[], void>({
      query: () => `${apiBase.endpoints.ministry}?limit=100`,
      transformResponse: (response: {items: MinistryEntity[]}) =>
        response.items,
    }),
  }),
});

export const {useGetAllMinistryQuery} = ministryApi;
