import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse } from "@/core/interfaces/responseEntity";
import { apiNewsBase } from "../constants/api";
import {
  INews,
  INewsResponse,
  INewsType,
  INewsTypeResponse,
  NewsType,
} from "./entities/newsEntity";

export const newsApi = createApi({
  reducerPath: EReducersPath.NEWS_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiNewsBase.baseUrl,
    timeout: 30 * 1000,
    prepareHeaders: async (headers) => {
      const { accessToken } = (await fetchAuthSession()).tokens ?? {};
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      );
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllNewsToExplorer: build.query<NewsType[], string>({
      query: (text) =>
        `${apiNewsBase.endpoints.news}?searchText=${text}&limit=2`,
      transformResponse: (response: IResponse<NewsType>) => response.data,
    }),
    getAllRecentNews: build.query<NewsType[], void>({
      query: () => apiNewsBase.endpoints.recentNews,
      transformResponse: (response: IResponse<NewsType>) => response.data,
    }),
    getAllNews: build.query<NewsType[], string>({
      query: (text) =>
        `${apiNewsBase.endpoints.news}?searchText=${text}&limit=100`,
    }),

    findAllNews: build.query<
      IResponse<INewsResponse>,
      {
        typeNewsId: number | string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({ typeNewsId, nextToken, limit }) =>
        `${apiNewsBase.endpoints.news}?limit=${limit}&typeNewsId=${
          typeNewsId !== "all" ? typeNewsId : ""
        }&nextToken=${nextToken}`,
      transformResponse: (response: IResponse<INews>) => ({
        ...response,
        data: response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          information: e.information,
          typeNewsId: e.typeNewsId,
          newsUrl: e.newsUrl,
          author: e.author,
          mediaUrls: e.mediaUrls,
          typeNews: e?.typeNews || "",
        })),
      }),
    }),

    findAllTypeNews: build.query<INewsTypeResponse[], void>({
      query: () => `${apiNewsBase.endpoints.typeNews}`,
      transformResponse: (response: IResponse<INewsType>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          erased: e.erased,
        })),
    }),
  }),
});

export const {
  useLazyGetAllNewsToExplorerQuery,
  useLazyGetAllRecentNewsQuery,
  useLazyFindAllNewsQuery,
  useFindAllTypeNewsQuery,
} = newsApi;
