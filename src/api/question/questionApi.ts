import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_BASE, apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import {
  IQuestionEntity,
  IQuestionResponse,
  QuestionEntity,
} from './entities/questionEntity';
import {IResponse} from '@/interfaces/responseEntity';

export const questionApi = createApi({
  reducerPath: EReducersPath.QUESTION_API,
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
    getAllQuestion: build.query<QuestionEntity[], void>({
      query: () => `${apiBase.endpoints.question}?limit=100`,
      transformResponse: (response: {items: QuestionEntity[]}) =>
        response.items,
    }),
    getQuestionById: build.query<QuestionEntity, number>({
      query: id => `${apiBase.endpoints.questionById}/${id}?limit=100`,
    }),
    findAllQuestions: build.query<IQuestionResponse[], void>({
      query: () => `${apiBase.userBaseUrl}${apiBase.endpoints.getAllQuestion}`,
      transformResponse: (response: IResponse<IQuestionEntity>) =>
        response.data.map((e, index) => ({
          id: index + 1,
          question: e.question,
          sk: e.sk,
        })),
    }),
  }),
});

export const {
  useGetAllQuestionQuery,
  useLazyGetQuestionByIdQuery,
  useFindAllQuestionsQuery,
} = questionApi;
