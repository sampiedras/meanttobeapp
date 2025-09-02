import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  SermonEntity,
  ICreateSermonLikeEntity,
  SermonsEntity,
  TopSermonsEntity,
  ISermonResponse,
  ISermon,
} from './entities/sermonEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const sermonApi = createApi({
  reducerPath: EReducersPath.SERMON_API,
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
    getAllSermon: build.query<
      SermonsEntity,
      {
        sermonType: number;
        page: number;
      }
    >({
      query: ({sermonType, page}) =>
        sermonType === 0
          ? `${apiBase.endpoints.sermon}?page=${page}&limit=20`
          : `${apiBase.endpoints.sermon}?typeSermonId=${sermonType}&page=${page}&limit=20`,
    }),
    getSermonById: build.query<SermonEntity, number>({
      query: id => `${apiBase.endpoints.sermonById}/${id}?limit=100`,
    }),
    getTopSermons: build.query<TopSermonsEntity[], void>({
      query: () => `${apiBase.endpoints.topSermon}`,
    }),
    getAllSermonFilter: build.query<SermonsEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.sermon}?limit=100&searchText=${searchText}`,
    }),
    createSermonLike: build.mutation<SermonEntity, ICreateSermonLikeEntity>({
      query: body => ({
        method: 'POST',
        url: `${apiBase.endpoints.createSermonLike}`,
        body,
      }),
    }),
    deleteSermonLike: build.mutation<SermonEntity, number>({
      query: (id: number) => ({
        method: 'DELETE',
        url: `${apiBase.endpoints.deleteLikedSermon}/${id}`,
      }),
    }),

    // news endpoints
    findAllSermons: build.query<
      IResponse<ISermonResponse>,
      {
        typeSermonId: number | string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({typeSermonId, nextToken, limit}) =>
        `${apiBase.sermonBaseUrl}${
          apiBase.endpoints.sermons
        }?limit=${limit}&typeSermonId=${
          typeSermonId !== 'all' ? typeSermonId : ''
        }&nextToken=${nextToken}`,
      transformResponse: (response: IResponse<ISermon>) => ({
        ...response,
        data: response.data.map(e => ({
          id: e.sk.split('#')[1],
          title: e.title,
          description: e.description,
          typeSermonId: e.typeSermonId,
          typeSermon: e.typeSermon,
          urlYouTube: e.urlYouTube,
          creationDate: e.creationDate,
        })),
      }),
    }),
    findSermonById: build.query<ISermonResponse, string>({
      query: id => `${apiBase.sermonBaseUrl}${apiBase.endpoints.sermons}/${id}`,
      transformResponse: (response: IResponseObject<ISermonResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllSermonQuery,
  useGetSermonByIdQuery,
  useLazyGetAllSermonQuery,
  useGetTopSermonsQuery,
  useGetAllSermonFilterQuery,
  useCreateSermonLikeMutation,
  useDeleteSermonLikeMutation,
  useLazyFindAllSermonsQuery,
  useFindSermonByIdQuery,
} = sermonApi;
