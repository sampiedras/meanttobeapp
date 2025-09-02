import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  EPreferenceLocation,
  ICreateMatchEntity,
  ISearchParametersEntity,
  MatchUserEntity,
  MatchUsersEntity,
} from './entities/matchEntity';

export const matchApi = createApi({
  reducerPath: EReducersPath.MATCH_API,
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
    getAllMatch: build.query<MatchUsersEntity, ISearchParametersEntity>({
      query: ({
        latitude,
        longitude,
        searchingsId,
        page,
        addTwoYears,
        rangeAge,
        searchRange,
      }) =>
        `${apiBase.endpoints.getMatch}?searchingsId=${searchingsId}&searchRange=${searchRange}&latitude=${latitude}&longitude=${longitude}&rangeAge=${rangeAge}&addTwoYears=${addTwoYears}&limit=10&page=${page}`,
    }),
    createMatch: build.mutation<void, ICreateMatchEntity>({
      query: body => ({
        method: 'POST',
        url: `${apiBase.endpoints.createMatch}`,
        body,
      }),
    }),
  }),
});

export const {
  useGetAllMatchQuery,
  useCreateMatchMutation,
  useLazyGetAllMatchQuery,
} = matchApi;
