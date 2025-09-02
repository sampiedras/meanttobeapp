import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import { ExplorerRecentAddedEntity } from './entities/explorerRecentAddedEntity';

export const explorerRecentAddedApi = createApi({
  reducerPath: EReducersPath.EXPLORER_RECENT_ADDED_API,
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
    getExplorerRecentAdded: build.query<ExplorerRecentAddedEntity, void>({
      query: () => `${apiBase.endpoints.explorerRecentAdded}`,
    }),
  }),
});

export const {useGetExplorerRecentAddedQuery} = explorerRecentAddedApi;
