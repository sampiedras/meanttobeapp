export interface UserEntity {
  active: boolean;
  avatar: string;
  cognito_id: string;
  created_at: string;
  erased: false;
  id: number;
  person: PersonEntity;
  role: 'USER';
  updated_at: string;
  username: string;
  tokenGetStream?: string;
  userQuestion?: UserQuestionEntity[];
  userDriveSection: UserDriveSectionEntity[];
  church: ChurchEntity;
  userMedias: UserMediasEntity[];
  searching: SearchingEntity;
  location?: {type: string; coordinates: number[]};
}

export interface PersonEntity {
  id: number;
  city?: string;
  state?: string;
  country?: string;
  country_id: number;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  detail_address?: string;
  date_of_birth?: string;
  search_range?: string;
  gender?: string;
  description_story?: string;
}

export interface IUserUpdateInfo {
  name: string;
  date_of_birth: string;
  description_story?: string;
  avatar: string;
  search_range?: string;
  gender?: string;
  searching_id?: number;
  church_id?: number;
  drive_section_ids: number[];
  questions: UserQuestionEntity[];
  images: string[];
}

interface Drive {
  name: string;
  driveId: string;
}

interface TypeDrive {
  name: string;
  typeDriveId: string;
}

interface UserDriveItem {
  typeDrive: TypeDrive;
  drives: Drive[];
}

export interface UserDrive {
  userDrive: UserDriveItem[];
}
export interface IUserUpdateInfoTwo {
  name: string;
  date_of_birth: string;
  description_story?: string;
  avatar: string;
  search_range?: string;
  gender?: string;
  searching_id?: string;
  church_id?: number;
  userDrive: UserDrive;
  questions: UserQuestionEntity[];
  images: string[];
}

export interface UserQuestionEntity {
  id: number;
  answer: string;
}
export interface IUserQuestionEntity {
  //only for question screen
  id: number;
  answer: string;
  question?: IQuestionEntity;
}

export interface IQuestionEntity {
  id: number;
  question?: string;
}
export interface IUserQuestionUpdate {
  questions: UserQuestionEntity[];
}

export interface UserDriveSectionEntity {
  id: number;
  driveSection: DriveSectionEntity;
}
export interface UserMediasEntity {
  id: number;
  image: string;
  isMain: boolean;
}

export interface DriveSectionEntity {
  id: number;
  name: string;
}

export interface ChurchEntity {
  id: number;
  name: string;
  description: string;
}

export interface SearchingEntity {
  id: number;
  name: string;
}

export interface ExplorerFavoriteEntity {
  id: number;
  quizId: number;
  quiz?: string;
  imgQuiz?: string;
  sermonId: number;
  title?: string;
  description?: string;
  urlYouTube?: string;
  songId: number;
  name: string;
  coverImage?: string;
  urlSong?: string;
  created_at: string;
  likeCountAlias?: string;
  type: string;
}

export interface CheckUserExistEntity {
  exist: Boolean;
  message: string;
}
export interface UserExistEntity {
  user_exist: Boolean;
}

export interface ResponseData {
  action: string;
  data: UserExistEntity;
  error: boolean;
  message: string;
}

export enum EPreferenceLocation {
  NEAR_ME = 'near_me',
  GLOBALLY = 'globally',
}

// export interface IUser {
//   name: string;
//   descriptionStory: string;
//   dateOfBirth: string;
//   role: string;
//   avatar: string;
//   typeAccount: string;
//   searchingId?: string;
//   searching?: string;
//   countryId?: number;
//   country?: string;
//   state?: string;
//   city?: string;
//   address?: string;
//   location?: {
//     latitude: number;
//     longitude: number;
//   };
//   searchRange: string;
//   distance?: number;
//   mediaUrls: string[];
//   userDrive: UserDrive
//   verse: string;
//   gender: string;
//   tokenGetStream?: string;
//   phone?: string;
//   email?: string;
//   userName?: string;
//   churchId?: string;
//   church?: string;
// }

export interface UserQuestion {
  questionId: string;
  question: string;
  answer: string;
}

export interface IUserUpdate {
  name: string;
  dateOfBirth: string;
  role: string;
  avatar: string;
  typeAccount: string;
  searchingId: string;
  searching: string;
  churchId: string;
  church: string;
  countryId: number;
  country: string;
  state: string;
  city: string;
  address: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  searchRange: string;
  distance: number;
  mediaUrls: string[];
  verse: string;
  userDrive: UserDrive;
  userQuestion: UserQuestion[];
  gender: string;
  descriptionStory: string;
}
