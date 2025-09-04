export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV;
export const APP_SCHEMA = process.env.EXPO_PUBLIC_APP_SCHEMA;
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE;
export const API_KEY_BIBLE = process.env.EXPO_PUBLIC_API_KEY_BIBLE || "";
export const GET_STREAM_API_KEY =
  process.env.EXPO_PUBLIC_GET_STREAM_API_KEY || "";
export const QONVERSION_API_KEY =
  process.env.EXPO_PUBLIC_QONVERSION_API_KEY || "";
export const API_KEY_GEOCODER_MAP =
  process.env.EXPO_PUBLIC_API_KEY_GEOCODER_MAP || "";

export const API_BIBLE_BASE = process.env.EXPO_PUBLIC_API_BIBLE_BASE;
export const API_MEDIA_BASE_URL = process.env.EXPO_PUBLIC_API_MEDIA_BASE_URL;
export const API_USER_BASE_URL =
  process.env.EXPO_PUBLIC_API_USER_BASE_URL || "";
export const API_SONG_BASE_URL =
  process.env.EXPO_PUBLIC_API_SONG_BASE_URL || "";
export const API_VERSE_BASE_URL =
  process.env.EXPO_PUBLIC_API_VERSE_BASE_URL || "";
export const API_SERMON_BASE_URL =
  process.env.EXPO_PUBLIC_API_SERMON_BASE_URL || "";
export const API_QUIZ_BASE_URL =
  process.env.EXPO_PUBLIC_API_QUIZ_BASE_URL || "";
export const API_NEWS_BASE_URL =
  process.env.EXPO_PUBLIC_API_NEWS_BASE_URL || "";

export enum EEnvironment {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}
