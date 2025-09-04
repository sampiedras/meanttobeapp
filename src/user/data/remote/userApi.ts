import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession } from "aws-amplify/auth";
import { EReducersPath } from "@/core/enums";
import { IResponse, IResponseObject } from "@/core/interfaces/responseEntity";
import { UserProfileType } from "@/core/types/AuthContextType";
import { ResponseEntity } from "@/core/types/responseEntity";
import { apiUserBase } from "@/user/constants/api";
import { IChurchEntity, ResponseChurchEntity } from "./entities/churchEntity";
import {
  IDriveEntity,
  IDriveEntityResponse,
  IDriveTypeEntity,
  ITypeDriveEntityResponse,
  UserDriveByUserType,
} from "./entities/driveEntity";
import {
  IQuestionEntity,
  IQuestionResponse,
  UserQuestionByUserType,
} from "./entities/questionEntity";
import {
  ISearchingEntity,
  SearchingEntityResponse,
} from "./entities/searchingEntity";
import {
  FilterMatch,
  UpdateUserChurchBodyType,
  UpdateUserFilterBodyType,
  UpdateUserImagesBodyType,
  UpdateUserNotificationBodyType,
  UpdateUserPermissionBodyType,
  UpdateUserStoryBodyType,
  UpdateUserTokenFirebaseBodyType,
  UserBodyType,
  UserDisLikeBodyType,
  UserLikeBodyType,
  UserMatchResponseType,
  UserMatchType,
  UserUpdateDrivesBodyType,
  UserUpdateQuestionBodyType,
} from "./entities/userEntity";

export const userApi = createApi({
  reducerPath: EReducersPath.USER_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: apiUserBase.baseUrl,
    timeout: 30 * 1000,
    prepareHeaders: async (headers, {}) => {
      headers.set("Content-Type", "application/json");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      );

      const { accessToken } = (await fetchAuthSession()).tokens ?? {};

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken.toString()}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfileType, string>({
      query: (userId) => `${apiUserBase.endpoints.user}/${userId}`,
      transformResponse: (response: ResponseEntity<UserProfileType>) =>
        response.data,
    }),
    createUser: build.mutation<any, UserBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.user,
        method: "POST",
        body,
      }),
    }),
    updateUserPermissions: build.mutation<any, UpdateUserPermissionBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserPermissions,
        method: "PUT",
        body,
      }),
    }),
    updateUserTokenFirebase: build.mutation<
      any,
      UpdateUserTokenFirebaseBodyType
    >({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserTokenFirebase,
        method: "PUT",
        body,
      }),
    }),
    getCheckUserExist: build.query<
      { exists: boolean },
      { id: string; type: "email" | "phone" }
    >({
      query: ({ id, type }) =>
        `${apiUserBase.endpoints.getCheckUserExist}/${id}?type=${type}`,
      transformResponse: (response: ResponseEntity<{ exists: boolean }>) =>
        response.data,
    }),
    getAllSearchings: build.query<SearchingEntityResponse[], void>({
      query: () => apiUserBase.endpoints.searching,
      transformResponse: (response: IResponse<ISearchingEntity>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
        })),
    }),
    getAllChurches: build.query<ResponseChurchEntity[], string>({
      query: (text) =>
        `${apiUserBase.endpoints.getAllChurch}?limit=100&nameToSearch=${text}`,
      transformResponse: (response: IResponse<IChurchEntity>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
        })),
    }),
    findAllDrive: build.query<IDriveEntity[], string>({
      query: (typeDriveId) =>
        `${apiUserBase.endpoints.getAllDrives}/${typeDriveId}`,
      transformResponse: (response: IResponse<IDriveEntityResponse>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
          gsiPk1Drive: e.gsiPk1Drive,
        })),
    }),
    findAllTypeDrive: build.query<IDriveTypeEntity[], void>({
      query: () => apiUserBase.endpoints.getAllTypeDrives,
      transformResponse: (response: IResponse<ITypeDriveEntityResponse>) =>
        response.data.map((e) => ({
          id: e.sk.split("#")[1],
          name: e.name,
        })),
    }),
    findAllQuestions: build.query<IQuestionResponse[], void>({
      query: () => `${apiUserBase.endpoints.getAllQuestion}`,
      transformResponse: (response: IResponse<IQuestionEntity>) =>
        response.data.map((e, index) => ({
          id: index + 1,
          question: e.question,
          sk: e.sk,
        })),
    }),

    // GET USERS MATCH
    getAllUserByGeoLocation: build.query<IResponse<UserMatchType>, FilterMatch>(
      {
        query: ({
          searching = "",
          gender = "FEMALE",
          nextToken = "",
          minAge = "18",
          maxAge = "82",
          latitude = "",
          longitude = "",
          distance = "40",
        }) =>
          `${apiUserBase.endpoints.getAllUserByLocation}?searching=${searching}&gender=${gender}&limit=20&minAge=${minAge}&maxAge=${maxAge}&latitude=${latitude}&longitude=${longitude}&distance=${distance}&nextToken=${nextToken}`,
      },
    ),

    updateUserFilters: build.mutation<any, UpdateUserFilterBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserFilter,
        method: "PUT",
        body,
      }),
    }),

    getDriveByUserId: build.query<UserDriveByUserType[], string>({
      query: (id) => `${apiUserBase.endpoints.driveByUserId}/${id}`,
      transformResponse: (response: IResponse<UserDriveByUserType>) =>
        response.data,
    }),

    getQuestionByUserId: build.query<UserQuestionByUserType[], string>({
      query: (id) => `${apiUserBase.endpoints.questionByUserId}/${id}`,
      transformResponse: (response: IResponse<UserQuestionByUserType>) =>
        response.data,
    }),

    createUserLike: build.mutation<UserMatchResponseType, UserLikeBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.createUserLike,
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponseObject<UserMatchResponseType>) =>
        response.data,
    }),

    createUserDisLike: build.mutation<any, UserDisLikeBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.createUserDisLike,
        method: "POST",
        body,
      }),
    }),
    updateUserStory: build.mutation<any, UpdateUserStoryBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserStory,
        method: "PUT",
        body,
      }),
    }),
    updateUserDrives: build.mutation<any, UserUpdateDrivesBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserDrives,
        method: "PUT",
        body,
      }),
    }),
    updateUserQuestions: build.mutation<any, UserUpdateQuestionBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserQuestions,
        method: "PUT",
        body,
      }),
    }),
    updateUserChurch: build.mutation<any, UpdateUserChurchBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserChurch,
        method: "PUT",
        body,
      }),
    }),
    updateUserImages: build.mutation<any, UpdateUserImagesBodyType>({
      query: (body) => ({
        url: apiUserBase.endpoints.updateUserImages,
        method: "PUT",
        body,
      }),
    }),
    updateUserNotification: build.mutation<any, UpdateUserNotificationBodyType>(
      {
        query: (body) => ({
          url: apiUserBase.endpoints.updateUserNotification,
          method: "PUT",
          body,
        }),
      },
    ),
    userDeletion: build.mutation<void, void>({
      query: () => ({
        url: apiUserBase.endpoints.userDeletion,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetUserProfileQuery,
  useCreateUserMutation,
  useLazyGetCheckUserExistQuery,
  useGetAllSearchingsQuery,
  useLazyGetAllChurchesQuery,
  useFindAllTypeDriveQuery,
  useLazyFindAllDriveQuery,
  useFindAllQuestionsQuery,
  useUpdateUserPermissionsMutation,
  useLazyGetAllUserByGeoLocationQuery,
  useUpdateUserFiltersMutation,
  useGetDriveByUserIdQuery,
  useGetQuestionByUserIdQuery,
  useCreateUserLikeMutation,
  useCreateUserDisLikeMutation,
  useUpdateUserStoryMutation,
  useUpdateUserDrivesMutation,
  useUpdateUserQuestionsMutation,
  useUpdateUserChurchMutation,
  useUpdateUserImagesMutation,
  useUpdateUserNotificationMutation,
  useUserDeletionMutation,
  useUpdateUserTokenFirebaseMutation,
} = userApi;
