export interface MatchUsersEntity {
  items: MatchUserEntity[];
  count: number;
}

export interface MatchUserEntity {
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
  userDriveSection: UserDriveSectionEntity[];
  church: ChurchEntity;
  userMedias: UserMediasEntity[];
  searching: SearchingEntity;
  userQuestion: UserQuestionEntity[];
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
  description_story?: string;
}

export interface UserQuestionEntity {
  id: number;
  answer: string;
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

export interface ICreateMatchEntity {
  user1Id: number;
  user2Id: number;
  tokenGetStream: string;
}

export interface ISearchParametersEntity {
  latitude: string;
  longitude: string;
  searchingsId: string;
  page: number;
  rangeAge: string;
  addTwoYears: string;
  searchRange: EPreferenceLocation;
}

export enum EPreferenceLocation {
  NEAR_ME = 'near_me',
  GLOBALLY = 'globally',
}
