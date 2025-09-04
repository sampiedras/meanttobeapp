import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse, responseType } from "@/core/interfaces/responseEntity";
import { apiQuizBase } from "../constants/api";
import {
  QuizQuestionResponseEntity,
  QuizQuestionsType,
} from "./entities/quiestionEntity";
import {
  QuizAnswersResponseEntity,
  QuizAnswersType,
  QuizEntity,
  QuizResponseEntity,
  QuizType,
} from "./entities/quizEntity";
import { TagEntity, TagResponseEntity } from "./entities/tagEntity";

export const quizApi = createApi({
  reducerPath: EReducersPath.QUIZ_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiQuizBase.baseUrl,
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
    getAllQuizByLike: build.query<QuizType[], void>({
      query: () => apiQuizBase.endpoints.quizByLike,
      transformResponse: (response: IResponse<QuizType>) => response.data,
    }),

    getAllQuizFavorite: build.query<QuizType[], void>({
      query: () => apiQuizBase.endpoints.quizFavoriteByUser,
      transformResponse: (response: IResponse<QuizType>) => response.data,
    }),

    getAllQuizzes: build.query<
      responseType<QuizEntity[]>,
      { nameToSearch: string; limit: number; nextToken: string }
    >({
      query: ({ nameToSearch, limit, nextToken = "" }) =>
        `${apiQuizBase.endpoints.quiz}?nameToSearch=${nameToSearch}&limit=${limit}&nextToken=${nextToken}`,
      transformResponse: ({
        data,
        nextToken,
        count,
        error,
        message,
      }: responseType<QuizResponseEntity[]>) => ({
        data: data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          description: item.description,
          img: item.img,
          isLike: item.isLike,
        })),
        nextToken,
        count,
        error,
        message,
      }),
    }),

    getQuestionByQuizId: build.query<QuizQuestionsType, string>({
      query: (quizId) => `${apiQuizBase.endpoints.quizQuestion}/${quizId}`,
      transformResponse: (response: IResponse<QuizQuestionResponseEntity>) =>
        response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
        })),
    }),

    getTrendingTags: build.query<TagEntity[], string[]>({
      query: (tags) =>
        `${apiQuizBase.endpoints.tagTrending}?tags=${tags.join(",")}`,
      transformResponse: (response: IResponse<TagResponseEntity>) =>
        response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          description: item.description,
          img: item.img,
        })),
    }),

    getAnswersByQuestionId: build.query<QuizAnswersType[], string>({
      query: (questionId) =>
        `${apiQuizBase.endpoints.answer}?questionId=${questionId}`,
      transformResponse: (response: IResponse<QuizAnswersResponseEntity>) =>
        response.data.map((item) => ({
          id: item.sk.split("#")[1],
          name: item.name,
          tag: item.tag,
          tagId: item.tagId,
        })),
    }),

    createQuizLike: build.mutation<void, string>({
      query: (quizLikeId) => ({
        method: "POST",
        url: apiQuizBase.endpoints.createQuizLike,
        body: { quizLikeId },
      }),
    }),

    deleteQuizLike: build.mutation<void, string>({
      query: (quizLikeId) => ({
        method: "DELETE",
        url: `${apiQuizBase.endpoints.deleteQuizLike}/${quizLikeId}`,
      }),
    }),
  }),
});

export const {
  useLazyGetAllQuizByLikeQuery,
  useLazyGetAllQuizFavoriteQuery,
  useGetQuestionByQuizIdQuery,
  useLazyGetTrendingTagsQuery,
  useGetAnswersByQuestionIdQuery,
  useLazyGetAllQuizzesQuery,
  useCreateQuizLikeMutation,
  useDeleteQuizLikeMutation,
} = quizApi;
