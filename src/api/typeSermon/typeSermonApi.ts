import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ITypeSermon,
  ITypeSermonResponse,
  TypeSermonEntity,
} from './entities/typeSermonEntity';
import {IResponse} from '@/interfaces/responseEntity';

export const typeSermonApi = createApi({
  reducerPath: EReducersPath.TYPE_SERMON_API,
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
    getAllTypeSermon: build.query<TypeSermonEntity[], void>({
      query: () => `${apiBase.endpoints.typeSermon}?limit=100`,
      transformResponse: (response: {items: TypeSermonEntity[]}) =>
        response.items,
    }),
    getTypeSermonById: build.query<TypeSermonEntity[], number>({
      query: id => `${apiBase.endpoints.typeSermonById}/${id}?limit=100`,
    }),
    findTypeSermon: build.query<ITypeSermonResponse[], void>({
      query: () => `${apiBase.sermonBaseUrl}${apiBase.endpoints.typeSermons}`,
      transformResponse: (response: IResponse<ITypeSermon>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
        })),
    }),
  }),
});

export const {
  useGetAllTypeSermonQuery,
  useGetTypeSermonByIdQuery,
  useFindTypeSermonQuery,
} = typeSermonApi;
