import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CheckUserExistEntity,
  ExplorerFavoriteEntity,
  IUserQuestionEntity,
  IUserQuestionUpdate,
  IUserUpdate,
  IUserUpdateInfo,
  ResponseData,
  UserDriveSectionEntity,
  UserEntity,
  UserQuestionEntity,
} from "@/api/user/entities/userEntity";
import { RootState } from "@/libraries/redux";
import { API_BASE, apiBase, EReducersPath } from "@/utils/config";
import {
  EPreferenceLocation,
  PersonEntity,
} from "../match/entities/matchEntity";

export const userApi = createApi({
  reducerPath: EReducersPath.USER_API,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    timeout: 30 * 1000,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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
    getUserProfile: build.query<UserEntity, string>({
      query: (sub) => `${apiBase.endpoints.profile}/${sub}`,
    }),
    updateUserInfo: build.mutation<UserEntity, IUserUpdateInfo>({
      query: (body) => ({
        method: "PUT",
        url: apiBase.endpoints.updateUserInfo,
        body,
      }),
    }),
    updateUserTokenFirebase: build.mutation<UserEntity, string>({
      query: (token) => ({
        method: "PUT",
        url: `${apiBase.endpoints.updateUserTokenFirebase}/${token}`,
      }),
    }),
    updateUserLocation: build.mutation<
      UserEntity,
      { latitude: number; longitude: number }
    >({
      query: (body) => ({
        method: "PUT",
        url: apiBase.endpoints.updateUserLocation,
        body,
      }),
    }),
    getTokenGetStream: build.query<{ token: string }, void>({
      query: () => apiBase.endpoints.getTokenGetStream,
    }),
    getUserQuestionProfile: build.query<IUserQuestionEntity[], void>({
      query: () => `${apiBase.endpoints.userQuestion}`,
    }),
    updateUserQuestions: build.mutation<
      UserQuestionEntity,
      IUserQuestionUpdate
    >({
      query: (body) => ({
        method: "PUT",
        url: apiBase.endpoints.updateUserQuestion,
        body,
      }),
    }),
    updateAvatarUser: build.mutation<
      UserEntity,
      { avatar: string; idUserMedia: number }
    >({
      query: ({ avatar, idUserMedia }) => ({
        url: apiBase.endpoints.updateAvatar,
        method: "PUT",
        body: {
          avatar: avatar,
          idUserMedia: idUserMedia,
        },
      }),
    }),

    updateUserMedia: build.mutation<UserEntity, any[]>({
      query: (images) => ({
        url: apiBase.endpoints.updateUserMedia,
        method: "PUT",
        body: {
          images,
        },
      }),
    }),
    getUserMedia: build.query<UserEntity, void>({
      query: () => apiBase.endpoints.userMedia,
    }),
    deleteUserMedia: build.mutation<UserEntity, number>({
      query: (idImg) => ({
        url: `${apiBase.endpoints.deleteUserMedia}/${idImg}`,
        method: "DELETE",
      }),
    }),
    getUserDriveSection: build.query<UserDriveSectionEntity[], void>({
      query: () => apiBase.endpoints.userDriveSection,
    }),
    updateDriveSection: build.mutation<UserDriveSectionEntity, any>({
      query: (driveSectionIds) => ({
        url: apiBase.endpoints.updateDriveSection,
        body: {
          drive_section_ids: driveSectionIds,
        },
        method: "PUT",
      }),
    }),
    getAllFavorites: build.query<ExplorerFavoriteEntity[], void>({
      query: () => apiBase.endpoints.explorerFavorite,
    }),
    updateUserStory: build.mutation<string, { storyUser: string }>({
      query: ({ storyUser }) => ({
        url: apiBase.endpoints.updateUserStory,
        method: "PUT",
        body: {
          story: storyUser,
        },
      }),
    }),
    getIsFirstTimeMatch: build.mutation<string, { idUser: number }>({
      query: ({ idUser }) => ({
        url: apiBase.endpoints.isFirstMatch,
        method: "POST",
        body: {
          idUser,
        },
      }),
    }),
    deleteUserAccount: build.mutation<void, void>({
      query: () => ({
        url: apiBase.endpoints.deleteUserAccount,
        method: "DELETE",
      }),
    }),
    getCheckUserExist: build.query<CheckUserExistEntity, { userName: string }>({
      query: ({ userName }) =>
        `${apiBase.endpoints.getCheckUserExist}/${userName}`,
    }),
    updateUserSearchRange: build.mutation<
      string,
      { searchRange: EPreferenceLocation }
    >({
      query: ({ searchRange }) => ({
        url: apiBase.endpoints.updateSearchRange,
        method: "PUT",
        body: {
          searchRange,
        },
      }),
    }),
    blockUserAccount: build.mutation<UserEntity, number>({
      query: (idUser) => ({
        url: `${apiBase.endpoints.blockUser}/${idUser}`,
        method: "DELETE",
      }),
    }),
    updateSearching: build.mutation<string, { idSearching: string }>({
      query: ({ idSearching }) => ({
        url: apiBase.endpoints.updateSearching,
        method: "PUT",
        body: {
          idSearching,
        },
      }),
    }),
    getByUserName: build.query<ResponseData, { userName: string }>({
      query: ({ userName }) =>
        `${apiBase.userBaseUrl}${apiBase.endpoints.getUserByName}/${userName}`,
    }),
    getUserProfileById: build.query<IUserUpdate, string>({
      query: (sub) =>
        `${apiBase.userBaseUrl}${apiBase.endpoints.profile}/${sub}`,
    }),
  }),
});

export const {
  useLazyGetUserProfileQuery,
  useUpdateUserInfoMutation,
  useLazyGetTokenGetStreamQuery,
  useUpdateUserLocationMutation,
  useUpdateUserTokenFirebaseMutation,
  useGetUserQuestionProfileQuery,
  useUpdateAvatarUserMutation,
  useUpdateUserMediaMutation,
  useGetUserMediaQuery,
  useDeleteUserMediaMutation,
  useGetUserDriveSectionQuery,
  useUpdateDriveSectionMutation,
  useGetAllFavoritesQuery,
  useUpdateUserQuestionsMutation,
  useUpdateUserStoryMutation,
  useGetIsFirstTimeMatchMutation,
  useDeleteUserAccountMutation,
  useLazyGetCheckUserExistQuery,
  useUpdateUserSearchRangeMutation,
  useBlockUserAccountMutation,
  useUpdateSearchingMutation,
  useLazyGetByUserNameQuery,
  useLazyGetUserProfileByIdQuery,
} = userApi;
