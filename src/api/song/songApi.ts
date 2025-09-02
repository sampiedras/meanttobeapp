import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ICreateSongLikeEntity,
  ISong,
  ISongResponse,
  SongEntity,
  SongsEntity,
} from './entities/songEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const songApi = createApi({
  reducerPath: EReducersPath.SONG_API,
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
    getSongsByGenreId: build.query<
      SongsEntity,
      {id: number; searchText: string; page: number}
    >({
      query: ({page, searchText, id}) =>
        `${apiBase.endpoints.songs}?limit=20&songGenreId=${id}&searchText=${searchText}&page=${page}`,
    }),
    getAllSongsByArtistId: build.query<SongsEntity, {id: number; page: number}>(
      {
        query: ({id, page}) =>
          `${apiBase.endpoints.songs}?limit=20&artistId=${id}&page=${page}`,
      },
    ),
    getSongById: build.query<SongEntity, number>({
      query: id => `${apiBase.endpoints.songById}/${id}?limit=100`,
    }),
    getAllSongsFilter: build.query<SongsEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.songs}?limit=100&searchText=${searchText}`,
    }),
    createSongLike: build.mutation<SongEntity, ICreateSongLikeEntity>({
      query: body => ({
        method: 'POST',
        url: `${apiBase.endpoints.createSongLike}`,
        body,
      }),
    }),
    deleteSongLike: build.mutation<SongEntity, number>({
      query: (id: number) => ({
        method: 'DELETE',
        url: `${apiBase.endpoints.deleteLikedSong}/${id}`,
      }),
    }),

    // news endpoints

    findAllSongsFilter: build.query<IResponse<ISongResponse>, string>({
      query: nameToSearch =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.song}?limit=100&nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
        })),
      }),
    }),
    findSongById: build.query<IResponseObject<ISongResponse>, string>({
      query: id => `${apiBase.songBaseUrl}${apiBase.endpoints.song}/${id}`,
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
      query: ({nameToSearch, songGenderId, nextToken, limit}) =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.song}?nameToSearch=${
          nameToSearch || ''
        }&songGenderId=${songGenderId}&nextToken=${nextToken}&limit=${limit}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
        })),
      }),
    }),
    findSongByArtistId: build.query<
      IResponse<ISongResponse>,
      {
        artistId: string;
        nextToken: string;
        limit: number;
      }
    >({
      query: ({artistId, nextToken, limit}) =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.song}?artistId=${artistId}&nextToken=${nextToken}&limit=${limit}`,
      transformResponse: (response: IResponse<ISong>) => ({
        ...response,
        data: response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          img: item.img,
          songUrl: item.songUrl,
          songGenderId: item.songGenderId,
          artistId: item.artistId,
          artist: item.artist,
        })),
      }),
    }),
  }),
});

export const {
  useLazyGetAllSongsByArtistIdQuery,
  useLazyGetSongsByGenreIdQuery,
  useGetSongByIdQuery,
  useGetAllSongsFilterQuery,
  useCreateSongLikeMutation,
  useDeleteSongLikeMutation,
  useFindAllSongsFilterQuery,
  useFindSongByIdQuery,
  useLazyFindSongByIdGenreQuery,
  useLazyFindSongByArtistIdQuery,
} = songApi;
