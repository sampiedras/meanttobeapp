import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';

import {RootState} from '@/libraries/redux';
import {INews, INewsResponse, NewsEntity} from './entities/newsEntity';
import {IResponse} from '@/interfaces/responseEntity';

export const newsApi = createApi({
  reducerPath: EReducersPath.NEWS_API,
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
    getAllNews: build.query<
      NewsEntity,
      {
        newsType: number | string;
        page: number;
      }
    >({
      query: ({newsType, page}) =>
        `${apiBase.endpoints.news}?newsCategoryId=${
          newsType !== 'all' ? newsType : ''
        }&page=${page}&limit=20`,
    }),
    getAllNewsFilter: build.query<NewsEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.news}?limit=100&searchText=${searchText}`,
    }),

    // new endpoints for news
    findAllNews: build.query<
      IResponse<INewsResponse>,
      {
        typeNewsId: number | string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({typeNewsId, nextToken, limit}) =>
        `${apiBase.newsBaseUrl}${
          apiBase.endpoints.newsEndPoint
        }?limit=${limit}&typeNewsId=${
          typeNewsId !== 'all' ? typeNewsId : ''
        }&nextToken=${nextToken}`,
      transformResponse: (response: IResponse<INews>) => ({
        ...response,
        data: response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          information: e.information,
          typeNewsId: e.typeNewsId,
          newsUrl: e.newsUrl,
          author: e.author,
          mediaUrls: e.mediaUrls,
        })),
      }),
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useLazyGetAllNewsQuery,
  useGetAllNewsFilterQuery,
  useLazyFindAllNewsQuery,
} = newsApi;
