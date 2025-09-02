import {RootState} from '@/libraries/redux';
import {apiBase, EReducersPath} from '@/utils/config';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  IPutFile,
  IPostSignedURLImage,
  IResponsePostSignedURLImage,
} from './entities/mediaEntity';

export const mediaApi = createApi({
  reducerPath: EReducersPath.MEDIA_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
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
    postSignedURLImage: build.mutation<
      IResponsePostSignedURLImage,
      IPostSignedURLImage
    >({
      query({name, type, folder}) {
        return {
          url: `${apiBase.mediaBaseUrl}`,
          method: 'POST',
          body: {
            name,
            type,
            folder,
          },
        };
      },
    }),

    putFile: build.mutation<void, IPutFile>({
      query({file, putUrl}) {
        return {
          url: putUrl,
          method: 'PUT',
          body: file,
        };
      },
    }),
  }),
});

export const {usePostSignedURLImageMutation, usePutFileMutation} = mediaApi;
