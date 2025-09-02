import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {apiBase, EReducersPath} from '@/utils/config';
import {RootState} from '@/libraries/redux';
import type {
  responseType,
  QuizEntity,
  QuizResponseEntity,
  QuizQuestionEntity,
  QuizQuestionResponseEntity,
  QuizAnswersEntity,
  QuizAnswersResponseEntity,
  TagResponseEntity,
  TagEntity,
} from './entities/quizzesEntity';

export const quizzesApi = createApi({
  reducerPath: EReducersPath.QUIZZES_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiBase.quizBaseUrl,
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
    getAllQuizzes: build.query<QuizEntity[], void>({
      query: () => `${apiBase.endpoints.quiz}?limit=2000`,

      transformResponse: (response: responseType<QuizResponseEntity[]>) =>
        response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          description: item.description,
          img: item.img,
          isLike: item.isLike,
        })),
    }),
    getQuestionByQuizId: build.query<QuizQuestionEntity[], string>({
      query: quizId => `${apiBase.endpoints.quizQuestion}/${quizId}`,
      transformResponse: (
        response: responseType<QuizQuestionResponseEntity[]>,
      ) =>
        response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
        })),
    }),
    getAnswersByQuestionId: build.query<QuizAnswersEntity[], string>({
      query: questionId =>
        `${apiBase.endpoints.answer}?questionId=${questionId}`,
      transformResponse: (
        response: responseType<QuizAnswersResponseEntity[]>,
      ) =>
        response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          tag: item.tag,
          tagId: item.tagId,
        })),
    }),

    getTrendingTags: build.query<TagEntity[], string[]>({
      query: tags => `${apiBase.endpoints.tagTrending}?tags=${tags.join(',')}`,
      transformResponse: (response: responseType<TagResponseEntity[]>) =>
        response.data.map(item => ({
          id: item.sk.split('#')[1],
          name: item.name,
          description: item.description,
          img: item.img,
        })),
    }),

    createQuizLike: build.mutation<void, string>({
      query: likeQuizId => ({
        method: 'POST',
        url: apiBase.endpoints.quizLike,
        body: {likeQuizId},
      }),
    }),

    deleteQuizLike: build.mutation<void, string>({
      query: likeQuizId => ({
        method: 'DELETE',
        url: `${apiBase.endpoints.quizLike}/${likeQuizId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetAllQuizzesQuery,
  useGetQuestionByQuizIdQuery,
  useGetAnswersByQuestionIdQuery,
  useLazyGetTrendingTagsQuery,
  useCreateQuizLikeMutation,
  useDeleteQuizLikeMutation,
} = quizzesApi;
