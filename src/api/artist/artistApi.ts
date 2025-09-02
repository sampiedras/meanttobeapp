import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  ArtistEntity,
  ArtistsEntity,
  IArtist,
  IArtistResponse,
} from './entities/artistEntity';
import {IResponse, IResponseObject} from '@/interfaces/responseEntity';

export const artistApi = createApi({
  reducerPath: EReducersPath.ARTIST_API,
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
    getArtistById: build.query<ArtistEntity, number>({
      query: id => `${apiBase.endpoints.artistById}/${id}`,
    }),

    getAllArtist: build.query<
      ArtistsEntity,
      {page: number; searchText: string}
    >({
      query: ({searchText, page}) =>
        `${apiBase.endpoints.artist}?limit=20&searchText=${searchText}&page=${page}`,
    }),

    getArtistByGenereId: build.query<
      ArtistsEntity,
      {page: number; searchText: string; id: number}
    >({
      query: ({searchText, page, id}) =>
        `${apiBase.endpoints.artistByGenreId}/${id}?limit=20&searchText=${searchText}&page=${page}`,
    }),

    findAllArtist: build.query<
      IResponse<IArtistResponse>,
      {nameToSearch: string; limit: number; nextToken: string}
    >({
      query: ({nameToSearch, limit, nextToken}) =>
        `${apiBase.songBaseUrl}${
          apiBase.endpoints.artists
        }?limit=${limit}&nextToken=${
          nextToken || ''
        }&nameToSearch=${nameToSearch}`,
      transformResponse: (response: IResponse<IArtist>) => ({
        ...response,
        data: response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          img: e.img,
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
      query: ({nameToSearch, limit, nextToken, songGenderId}) =>
        `${apiBase.songBaseUrl}${apiBase.endpoints.artists}?limit=${limit}&nextToken=${nextToken}&nameToSearch=${nameToSearch}&songGenderId=${songGenderId}`,
      transformResponse: (response: IResponse<IArtist>) => ({
        ...response,
        data: response.data.map(e => ({
          id: e.sk.split('#')[1],
          name: e.name,
          img: e.img,
        })),
      }),
    }),
    finArtistByI: build.query<IArtistResponse, string>({
      query: id => `${apiBase.songBaseUrl}${apiBase.endpoints.artists}/${id}`,
      transformResponse: (response: IResponseObject<IArtistResponse>) =>
        response.data,
    }),
  }),
});

export const {
  useGetArtistByIdQuery,
  useLazyGetAllArtistQuery,
  useLazyGetArtistByGenereIdQuery,
  useLazyFindAllArtistQuery,
  useLazyFindArtistByGenreIdQuery,
  useFinArtistByIQuery,
} = artistApi;
