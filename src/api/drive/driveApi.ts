import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  DriveEntity,
  IDriveEntity,
  IDriveTypeEntity,
} from './entities/driveEntity';
import {IResponse} from '@/interfaces/responseEntity';

export const driveApi = createApi({
  reducerPath: EReducersPath.DRIVE_API,
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
    getAllDrive: build.query<DriveEntity[], void>({
      query: () => `${apiBase.endpoints.drive}?limit=100`,
      transformResponse: (response: {items: DriveEntity[]}) => response.items,
    }),
    findAllDrive: build.query<IDriveEntity[], void>({
      query: () => `${apiBase.userBaseUrl}${apiBase.endpoints.getAllDrives}`,
      transformResponse: (response: IResponse<IDriveEntity>) => response.data,
    }),
    findAllTypeDrive: build.query<IDriveTypeEntity[], void>({
      query: () =>
        `${apiBase.userBaseUrl}${apiBase.endpoints.getAllTypeDrives}`,
      transformResponse: (response: IResponse<IDriveTypeEntity>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllDriveQuery,
  useLazyGetAllDriveQuery,
  useLazyFindAllDriveQuery,
  useLazyFindAllTypeDriveQuery,
} = driveApi;
