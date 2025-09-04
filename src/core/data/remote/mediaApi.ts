import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { apiMediaBase } from "@/core/constants/api";
import { EReducersPath } from "@/core/enums";
import { GenericResponse } from "../interface/GenericResponse";
import { MediaBodyEntity, MediaEntity } from "./entities/mediaEntity";
const Buffer = require("buffer").Buffer;

export const mediaApi = createApi({
  reducerPath: EReducersPath.MEDIA_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiMediaBase.baseUrl,
    timeout: 30 * 1000,
    prepareHeaders: async (headers, {}) => {
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      );

      const { accessToken } = (await fetchAuthSession()).tokens ?? {};

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken.toString()}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getUrlMedia: build.mutation<MediaEntity, MediaBodyEntity>({
      query: (body) => ({
        url: apiMediaBase.endpoints.resources,
        method: "POST",
        body,
      }),
      transformResponse: (response: GenericResponse<MediaEntity>) =>
        response.data,
    }),
  }),
});

export const putMediaApi = createApi({
  reducerPath: EReducersPath.PUT_MEDIA_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    timeout: 30 * 1000,
    prepareHeaders: async (headers, {}) => {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      );

      return headers;
    },
  }),
  endpoints: (build) => ({
    putMedia: build.mutation<
      MediaEntity,
      { url: string; file: string; headers: { "Content-Type": string } }
    >({
      query: ({ file, url, headers }) => ({
        url,
        method: "PUT",
        body: Buffer.from(file, "base64"),
        headers,
      }),
    }),
  }),
});

export const { useGetUrlMediaMutation } = mediaApi;
export const { usePutMediaMutation } = putMediaApi;
