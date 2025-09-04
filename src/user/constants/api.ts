import { API_USER_BASE_URL } from "@/core/utils/config";

export const apiUserBase = {
  baseUrl: API_USER_BASE_URL,
  endpoints: {
    user: "/user",
    getCheckUserExist: "/user_exist",
    updateUserPermissions: "/update_user_permissions",
    updateUserTokenFirebase: "/update_user_token_firebase",
    updateUserFilter: "/update_user_filter",
    searching: "/searching",
    getAllChurch: "/church",
    getAllDrives: "/drive",
    getAllTypeDrives: "/type_drive",
    getAllQuestion: "/question",
    getAllUserByLocation: "/user/geo_location",
    driveByUserId: "/drive_by_user_id",
    questionByUserId: "/question_by_user_id",
    createUserLike: "user/create_user_like",
    createUserDisLike: "user/create_user_dis_like",
    updateUserStory: "update_user_story",
    updateUserDrives: "update_user_drives",
    updateUserQuestions: "update_user_questions",
    updateUserChurch: "update_user_church",
    updateUserImages: "update_user_images",
    updateUserNotification: "update_user_notification",
    userDeletion: "user_deletion",
  },
};
