import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse, IResponseObject } from "@/core/interfaces/responseEntity";
import { apiSermonBase } from "../constants/api";
import {
  ISermon,
  ISermonResponse,
  ITypeSermon,
  ITypeSermonResponse,
  SermonsType,
  SermonType,
} from "./entities/sermonEntity";

export const sermonApi = createApi({
  reducerPath: EReducersPath.SERMON_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiSermonBase.baseUrl,
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
    getAllSermonToExplorer: build.query<SermonsType, string>({
      query: (text) =>
        `${apiSermonBase.endpoints.sermon}?nameToSearch=${text}&limit=2`,
      transformResponse: (response: IResponse<SermonType>) => response.data,
    }),
    getAllSermonByLike: build.query<SermonsType, void>({
      query: () => apiSermonBase.endpoints.sermonByLike,
      transformResponse: (response: IResponse<SermonType>) => response.data,
    }),
    getAllRecentSermons: build.query<SermonsType, void>({
      query: () => apiSermonBase.endpoints.recentSermons,
      transformResponse: (response: IResponse<SermonType>) => response.data,
    }),
    getAllSermonsFavorite: build.query<SermonsType, void>({
      query: () => apiSermonBase.endpoints.sermonFavoriteByUser,
      transformResponse: (response: IResponse<SermonType>) => response.data,
    }),
    getAllSermon: build.query<SermonsType, string>({
      query: (text) =>
        `${apiSermonBase.endpoints.sermon}?nameToSearch=${text}&limit=100`,
    }),
    getSermonById: build.query<SermonType, string>({
      query: (id) => `${apiSermonBase.endpoints.sermon}/${id}`,
      transformResponse: (response: IResponseObject<SermonType>) =>
        response.data,
    }),

    findAllSermons: build.query<
      IResponse<ISermonResponse>,
      {
        typeSermonId: number | string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({ typeSermonId, nextToken, limit }) =>
        `${apiSermonBase.endpoints.sermon}?limit=${limit}&typeSermonId=${
          typeSermonId !== "all" ? typeSermonId : ""
        }&nextToken=${nextToken}`,
      transformResponse: (response: IResponse<ISermon>) => ({
        ...response,
        data: response.data.map((e) => ({
          id: e.sk.split("#")[1],
          title: e.title,
          description: e.description,
          typeSermonId: e.typeSermonId,
          typeSermon: e.typeSermon,
          urlYouTube: e.urlYouTube,
          creationDate: e.creationDate,
          isLike: e.isLike,
        })),
      }),
    }),

    findTypeSermon: build.query<ITypeSermonResponse[], void>({
      query: () => `${apiSermonBase.endpoints.typeSermon}`,
      transformResponse: (response: IResponse<ITypeSermon>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
        })),
    }),

    createSermonLike: build.mutation<void, string>({
      query: (sermonLikeId) => ({
        method: "POST",
        url: apiSermonBase.endpoints.createSermonLike,
        body: { sermonLikeId },
      }),
    }),

    deleteSermonLike: build.mutation<void, string>({
      query: (sermonLikeId) => ({
        method: "DELETE",
        url: `${apiSermonBase.endpoints.deleteSermonLike}/${sermonLikeId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetAllSermonToExplorerQuery,
  useLazyGetAllSermonByLikeQuery,
  useLazyGetAllRecentSermonsQuery,
  useLazyGetAllSermonsFavoriteQuery,
  useGetSermonByIdQuery,
  useLazyFindAllSermonsQuery,
  useFindTypeSermonQuery,
  useCreateSermonLikeMutation,
  useDeleteSermonLikeMutation,
} = sermonApi;
