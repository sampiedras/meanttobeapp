import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse, IResponseObject } from "@/core/interfaces/responseEntity";
import { apiVerseBase } from "../constants/api";
import {
  ITypeVerse,
  ITypeVerseResponse,
  IVerse,
  IVerseResponse,
  VersesType,
  VerseType,
} from "./entities/verseEntity";

export const verseApi = createApi({
  reducerPath: EReducersPath.VERSE_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiVerseBase.baseUrl,
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
    getAllVersesToExplorer: build.query<VersesType, string>({
      query: (text) =>
        `${apiVerseBase.endpoints.verse}?searchText=${text}&limit=2`,
      transformResponse: (response: IResponse<VerseType>) => response.data,
    }),
    getAllRecentVerse: build.query<VersesType, void>({
      query: () => apiVerseBase.endpoints.recentVerse,
      transformResponse: (response: IResponse<VerseType>) => response.data,
    }),
    getAllVerse: build.query<VersesType, string>({
      query: (text) =>
        `${apiVerseBase.endpoints.verse}?searchText=${text}&limit=100`,
    }),
    getVerseById: build.query<VerseType, string>({
      query: (id) => `${apiVerseBase.endpoints.verse}/${id}`,
      transformResponse: (response: IResponseObject<VerseType>) =>
        response.data,
    }),

    findAllTypeVerse: build.query<ITypeVerseResponse[], string>({
      query: (nameToSearch) =>
        `${apiVerseBase.endpoints.typeVerse}?nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ITypeVerse>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          coverImg: e.coverImg,
        })),
    }),

    findTypeVerseById: build.query<ITypeVerseResponse, string>({
      query: (typeVerseId) =>
        `${apiVerseBase.endpoints.typeVerse}/${typeVerseId}`,
      transformResponse: (response: IResponseObject<ITypeVerseResponse>) =>
        response.data,
    }),

    findAllVerseByTypeVerseId: build.query<
      IResponse<IVerseResponse>,
      {
        nameToSearch: string;
        typeVerseId: string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({ nameToSearch, typeVerseId, nextToken, limit }) =>
        `${
          apiVerseBase.endpoints.verse
        }?nameToSearch=${nameToSearch}&typeVerseId=${typeVerseId}&nextToken=${
          nextToken || ""
        }&limit=${limit}`,
      transformResponse: (response: IResponse<IVerse>) => ({
        ...response,
        data: response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          img: e.img,
          shareImg: e.shareImg,
          verseQuote: e.verseQuote,
          typeVerseId: e.typeVerseId,
          typeVerse: e.typeVerse,
        })),
      }),
    }),

    findVerseById: build.query<IVerseResponse, string>({
      query: (id) => `${apiVerseBase.endpoints.verse}/${id}`,
      transformResponse: (response: IResponseObject<IVerseResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useLazyGetAllVersesToExplorerQuery,
  useLazyGetAllRecentVerseQuery,
  useGetVerseByIdQuery,
  useFindAllTypeVerseQuery,
  useFindTypeVerseByIdQuery,
  useFindAllVerseByTypeVerseIdQuery,
  useLazyFindAllVerseByTypeVerseIdQuery,
  useFindVerseByIdQuery,
} = verseApi;
