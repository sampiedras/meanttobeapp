import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ISongGenre,
  ISongGenreResponse,
  SongGenreEntity,
  SongsGenresEntity,
} from './entities/songGenreEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const songGenreApi = createApi({
  reducerPath: EReducersPath.SONG_GENRE_API,
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
    getAllSongGenre: build.query<SongsGenresEntity, string>({
      query: searchText =>
        `${apiBase.endpoints.songGenre}?limit=1000&searchText=${searchText}`,
    }),
    getSongGenreById: build.query<SongGenreEntity, number>({
      query: id => `${apiBase.endpoints.songGenreById}/${id}?limit=100`,
    }),
    findAllSongGenre: build.query<ISongGenreResponse[], string>({
      query: nameToSearch =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.songGender}?nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<ISongGenre>) =>
        response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          coverImg: e.coverImg,
        })),
    }),
    findSongGenreById: build.query<ISongGenreResponse, string>({
      query: id =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.songGender}/${id}`,
      transformResponse: (response: IResponseObject<ISongGenreResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllSongGenreQuery,
  useGetSongGenreByIdQuery,
  useFindAllSongGenreQuery,
  useFindSongGenreByIdQuery,
} = songGenreApi;
