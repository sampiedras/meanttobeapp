import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse, IResponseObject } from "@/core/interfaces/responseEntity";
import { apiSongBase } from "../constants/api";
import { IArtist, IArtistResponse } from "./entities/artistEntity";
import {
  ILikedSong,
  ISong,
  ISongGenre,
  ISongGenreResponse,
  ISongResponse,
  SongsType,
  SongType,
} from "./entities/songEntity";

export const songApi = createApi({
  reducerPath: EReducersPath.SONG_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiSongBase.baseUrl,
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
    getAllSongsToExplorer: build.query<SongsType, string>({
      query: (text) =>
        `${apiSongBase.endpoints.song}?nameToSearch=${text}&limit=2`,
      transformResponse: (response: IResponse<SongType>) => response.data,
    }),
    getAllSongsByLike: build.query<SongsType, void>({
      query: () => apiSongBase.endpoints.songByLike,
      transformResponse: (response: IResponse<SongType>) => response.data,
    }),
    getAllRecentSongs: build.query<SongsType, void>({
      query: () => apiSongBase.endpoints.recentSongs,
      transformResponse: (response: IResponse<SongType>) => response.data,
    }),
    getAllSongsFavorite: build.query<SongsType, void>({
      query: () => apiSongBase.endpoints.songFavoriteByUser,
      transformResponse: (response: IResponse<SongType>) => response.data,
    }),
    getAllSongs: build.query<SongsType, string>({
      query: (text) =>
        `${apiSongBase.endpoints.song}?nameToSearch=${text}&limit=100`,
    }),
    getSongById: build.query<SongType, string>({
      query: (id) => `${apiSongBase.endpoints.song}/${id}`,
      transformResponse: (response: IResponseObject<SongType>) => response.data,
    }),

    findAllArtist: build.query<
      IResponse<IArtistResponse>,
      { nameToSearch: string; limit: number; nextToken: string }
    >({
      query: ({ nameToSearch, limit, nextToken }) =>
        `${apiSongBase.endpoints.artists}?limit=${limit}&nextToken=${
          nextToken || ""
        }&nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<IArtist>) => ({
        ...response,
        data: response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          img: e.img,
        })),
      }),
    }),

    findAllSongGenre: build.query<ISongGenreResponse[], string>({
      query: (nameToSearch) =>
        `${apiSongBase.endpoints.songGender}?nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ISongGenre>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          coverImg: e.coverImg,
        })),
    }),

    findSongGenreById: build.query<ISongGenreResponse, string>({
      query: (id) => `${apiSongBase.endpoints.songGender}/${id}`,
      transformResponse: (response: IResponseObject<ISongGenreResponse>) =>
        response.data,
    }),

    findAllSongsFilter: build.query<IResponse<ISongResponse>, string>({
      query: (nameToSearch) =>
        `${apiSongBase.endpoints.song}?limit=100&nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
          isLike: item?.isLike,
        })),
      }),
    }),

    finArtistByI: build.query<IArtistResponse, string>({
      query: (id) => `${apiSongBase.endpoints.artists}/${id}`,
      transformResponse: (response: IResponseObject<IArtistResponse>) =>
        response.data,
    }),
    findSongByArtistId: build.query<
      IResponse<ISongResponse>,
      {
        artistId: string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({ artistId, nextToken, limit }) =>
        `${apiSongBase.endpoints.song}?artistId=${artistId}&nextToken=${nextToken}&limit=${limit}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
          isLike: item?.isLike,
        })),
      }),
    }),

    findSongByIdGenre: build.query<
      IResponse<ISongResponse>,
      {
        nameToSearch: string;
        songGenderId: string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({ nameToSearch, songGenderId, nextToken, limit }) =>
        `${apiSongBase.endpoints.song}?nameToSearch=${
          nameToSearch || ""
        }&songGenderId=${songGenderId}&nextToken=${nextToken}&limit=${limit}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
          isLike: item?.isLike,
        })),
      }),
    }),

    findArtistByGenreId: build.query<
      IResponse<IArtistResponse>,
      {
        nameToSearch: string;
        limit: number;
        nextToken: string;
        songGenderId: string;
      }
    >({
      query: ({ nameToSearch, limit, nextToken, songGenderId }) =>
        `${apiSongBase.endpoints.artists}?limit=${limit}&nextToken=${nextToken}&nameToSearch=${nameToSearch}&songGenderId=${songGenderId}`,
      transformResponse: (response: IResponse<IArtist>) => ({
        ...response,
        data: response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          img: e.img,
        })),
      }),
    }),
    createSongLike: build.mutation<void, ILikedSong>({
      query: (body) => ({
        url: apiSongBase.endpoints.songLike,
        method: "POST",
        body,
      }),
    }),
    deleteSongLike: build.mutation<void, string>({
      query: (songLikeId) => ({
        method: "DELETE",
        url: `${apiSongBase.endpoints.deleteSongLike}/${songLikeId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetAllSongsQuery,
  useLazyGetAllSongsToExplorerQuery,
  useLazyGetAllSongsByLikeQuery,
  useLazyGetAllRecentSongsQuery,
  useLazyGetAllSongsFavoriteQuery,
  useGetSongByIdQuery,
  useLazyFindAllArtistQuery,
  useFindAllSongGenreQuery,
  useFindAllSongsFilterQuery,
  useFinArtistByIQuery,
  useLazyFindSongByArtistIdQuery,
  useFindSongGenreByIdQuery,
  useLazyFindSongByIdGenreQuery,
  useLazyFindArtistByGenreIdQuery,
  useCreateSongLikeMutation,
  useDeleteSongLikeMutation,
} = songApi;
