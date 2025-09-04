import { UserQuestion } from "./questionEntity";

export type UserBodyEntity = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
};

export type DrivesType = {
  name: string;
  driveId: string;
};

export type UserDriveType = {
  name: string;
  typeDriveId: string;
  drives: DrivesType[];
};

export type UserBodyType = {
  name: string;
  descriptionStory?: string;
  dateOfBirth: string;
  avatar: string;
  typeAccount: "email" | "phone" | "apple";
  searchingId: string;
  searching: string;
  churchId?: string;
  church?: string;
  countryId: number;
  country: string;
  state: string;
  city: string;
  address?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  searchRange: string;
  distance: number;
  mediaUrls: string[];
  verse: string;
  gender: string;
  phone?: string;
  email?: string;
  userName?: string;
  userDrive: UserDriveType;
  userQuestion: UserQuestion[];
};

export type UpdateUserPermissionBodyType = {
  location: {
    latitude: number;
    longitude: number;
  };
};

export type UpdateUserTokenFirebaseBodyType = {
  tokenFirebase: string;
};

export type UpdateUserFilterBodyType = {
  searchingId: string;
  searching: string;
  searchRange: "LOCALLY" | "GLOBALLY";
};

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export type UserMatchType = {
  name: string;
  nameToSearch: string;
  descriptionStory?: string;
  dateOfBirth: string;
  role: string;
  avatar: string;
  typeAccount: string;
  searchingId: string;
  searching: string;
  churchId?: string;
  church?: string;
  countryId: number;
  country: string;
  state: string;
  city: string;
  address?: string;
  location: UserLocation;
  searchRange: "LOCALLY" | "GLOBALLY";
  distance: number;
  mediaUrls?: string[];
  verse: string;
  gender: "MALE" | "FEMALE";
  phone?: string;
  email?: string;
  userId?: string;
  userName?: string;
};

export type FilterMatch = {
  searching: string;
  gender: "MALE" | "FEMALE";
  nextToken: string;
  minAge: string;
  maxAge: string;
  latitude: string;
  longitude: string;
  distance: string;
  searchRange: "LOCALLY" | "GLOBALLY";
  isConfig?: boolean;
};

export type UserLikeBodyType = {
  likeUserId: string;
  avatarUser: string;
  nameUser: string;
  avatarLikeUser: string;
  nameLikeUser: string;
  tokenGetStream: string;
};

export type UserMatchResponseType = {
  pk: string;
  sk: string;
  userMatch: boolean;
  channelId: string;
  userImage: string;
};

export type UserDisLikeBodyType = {
  disLikeUserId: string;
};

export type UpdateUserStoryBodyType = {
  story: string;
};

export type UpdateUserChurchBodyType = {
  church: string;
};

export type UpdateUserImagesBodyType = {
  avatar: string;
  mediaUrls: string[];
};

export type UpdateUserNotificationBodyType = {
  notification: boolean;
};

export type UserUpdateDrivesBodyType = {
  userDrive: UserDriveType[];
  userTypeDriveToDeleteIds: string[];
};

export type UserUpdateQuestionBodyType = {
  userQuestion: UserQuestion[];
  verse: string;
  userQuestionToDeleteIds: string[];
};
