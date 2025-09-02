import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {PurchaseEntity} from './entities/purchaseEntity';

export const purchaseApi = createApi({
  reducerPath: EReducersPath.PURCHASE_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://81e6-138-84-41-2.ngrok-free.app/dev',
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
    makePurchase: build.mutation<string, PurchaseEntity>({
      query: body => ({
        url: apiBase.endpoints.purchase,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useMakePurchaseMutation} = purchaseApi;
