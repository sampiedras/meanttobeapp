import Constants from "expo-constants";

export const API_BASE = Constants.expoConfig?.extra?.apiBase;
export const API_BIBLE_BASE = Constants.expoConfig?.extra?.apiBibleBase;
export const API_KEY_BIBLE = Constants.expoConfig?.extra?.apiKeyBible || "";
export const GET_STREAM_API_KEY =
  Constants.expoConfig?.extra?.getStreamApiKey || "";
export const QONVERSION_API_KEY =
  Constants.expoConfig?.extra?.qonversionApiKey || "";
export const API_KEY_GEOCODER_MAP =
  Constants.expoConfig?.extra?.apiKeyGeocoderMap || "";
export const API_BASE_USER = Constants.expoConfig?.extra?.apiBaseUser || "";
export const API_BASE_MEDIA = Constants.expoConfig?.extra?.apiBaseMedia || "";
export const API_BASE_SONG = Constants.expoConfig?.extra?.apiBaseSong || "";
export const API_BASE_NEWS = Constants.expoConfig?.extra?.apiBaseNews || "";
export const API_BASE_QUIZ = Constants.expoConfig?.extra?.apiBaseQuiz || "";
export const API_BASE_VERSE = Constants.expoConfig?.extra?.apiBaseVerse || "";
export const API_BASE_SERMON = Constants.expoConfig?.extra?.apiBaseSermon || "";

// console.log('@@@@@@@@@@', Config)

export enum EReducersPath {
  USER_API = "userApi",
  SEARCHING_API = "searchingApi",
  CHURCH_API = "churchApi",
  BEGINNING_API = "beginningApi",
  SOCIAL_CAUSE_API = "socialCauseApi",
  MINISTRY_API = "ministryApi",
  QUESTION_API = "questionApi",
  BIBLE_API = "bibleApi",
  DRIVE_API = "driveApi",
  SERMON_API = "sermonApi",
  TYPE_SERMON_API = "typeSermonApi",
  NEWS_API = "newsApi",
  TYPE_NEWS_API = "typeNews",
  SONG_API = "songApi",
  SONG_GENRE_API = "songGenreApi",
  ARTIST_API = "artistApi",
  TYPE_VERSE_API = "typeVerseApi",
  VERSE_API = "verseApi",
  EXPLORER_RANDOM_API = "explorerRandomApi",
  QUIZZES_API = "quizzesApi",
  EXPLORER_RECENT_ADDED_API = "explorerRecentAddedApi",
  MATCH_API = "matchApi",
  PURCHASE_API = "purchaseApi",
  MEDIA_API = "mediaApi",
}

export const apiBase = {
  baseUrl: API_BASE,
  userBaseUrl: API_BASE_USER,
  mediaBaseUrl: API_BASE_MEDIA,
  songBaseUrl: API_BASE_SONG,
  verseBaseUrl: API_BASE_VERSE,
  newsBaseUrl: API_BASE_NEWS,
  sermonBaseUrl: API_BASE_SERMON,
  quizBaseUrl: API_BASE_SERMON,
  endpoints: {
    // INTERNAL API
    profile: "/user/get-by-cognito",
    getTokenGetStream: "/user/get-token-get-stream",
    updateUserInfo: "/user/update-user-info",
    updateUserTokenFirebase: "/user/update-user-token-firebase",
    updateUserLocation: "/user/update-user-location",
    searchings: "/searching/get-all",
    church: "/church/get-all",
    beginning: "/beginning/get-all",
    socialCause: "/social-cause/get-all",
    ministry: "/ministry/get-all",
    // question: '/question/get-all',
    questionById: "/question/get-by-id",
    drive: "/drive/get-all",
    sermon: "/sermon/get-all-mobile",
    topSermon: "/sermon/top-sermon",
    createSermonLike: "sermon/create-sermon-like",
    sermonById: "/sermon/get-by-id",
    news: "news/get-all-mobile",
    typeSermon: "/type-sermon/get-all-mobile",
    typeSermonById: "/type-sermon/get-by-id",
    typeNews: "news-category/get-all",
    songGenre: "song-genre/get-all-mobile",
    songGenreById: "song-genre/get-by-id",
    artist: "artist/get-all-mobile",
    songs: "song/get-all-mobile",
    createSongLike: "song/create-song-like",
    typeVerse: "type-verse/get-all-mobile",
    typeVerseById: "type-verse/get-by-id",
    verse: "verse/get-all-mobile",
    verseById: "verse/get-by-id",
    explorerRandom: "/explorer/random",
    explorerRecentAdded: "/explorer/recent-added",
    explorerFavorite: "/user/get-all-favorite",
    artistById: "artist/get-by-id",
    songById: "song/get-by-id",
    quizzes: "quiz/get-all-mobile",
    quizById: "quiz/get-by-id",
    userQuestion: "/user/user-question",
    updateUserQuestion: "/user/update-user-questions",
    updateAvatar: "user/update-avatar",
    updateUserMedia: "/user/update-medias",
    userMedia: "/user/user-medias",
    deleteUserMedia: "user/delete-user-media",
    userDriveSection: "user/user-drive-section",
    updateDriveSection: "user/update-user-drives-section",
    tagsByAnswerId: "quiz/get-common-tag",
    createQuizLike: "quiz/create-quiz-like",
    deleteLikedQuiz: "quiz/delete-liked-quiz",
    deleteLikedSong: "song/delete-liked-song",
    deleteLikedSermon: "sermon/delete-liked-sermon",
    artistByGenreId: "artist/get-by-id-genre",
    getMatch: "user/find-all-match",
    createMatch: "user/create-match",
    updateUserStory: "user/update-story",
    isFirstMatch: "user/is-first-match",
    deleteUserAccount: "/user/delete-account",
    getCheckUserExist: "/user/check-user-exist",
    updateSearchRange: "user/update-search-range",
    blockUser: "user/delete",
    updateSearching: "user/update-searching",
    // EXTERNAL API
    bibles: "/bibles",
    purchase: "webhook/qonversion",

    // user endpoints new
    getUserById: "/user",
    getUserByName: "/user/get_user_by_username",
    getAllSearching: "/searching",
    getAllChurch: "/church",
    getAllDrives: "/drive",
    getAllTypeDrives: "/type_drive",
    getAllQuestion: "/question",
    // song news endpoints

    songGender: "/song_gender",
    artists: "/artist",
    song: "/song",

    // verses endpoints
    typeVerses: "/type_verse",
    verses: "/verse",

    // news endpoints
    newsType: "/type_news",
    newsEndPoint: "/news",

    // new endpoints for sermon
    sermons: "/sermon",
    typeSermons: "/type_sermon",

    // quizzes endpoints
    quiz: "/quiz_mobile",
    quizLike: "/quiz_like",
    tagTrending: "/tag_trending",
    quizQuestion: "/question",
    answer: "/answer",
    tag: "/tag",
  },
};
