import { API_SONG_BASE_URL } from "@/core/utils/config";

export const apiSongBase = {
  baseUrl: API_SONG_BASE_URL,
  endpoints: {
    song: "/song",
    songByLike: "/song_by_like",
    recentSongs: "/recent_songs",
    songFavoriteByUser: "/song_favorite_by_user",
    artists: "/artist",
    songGender: "/song_gender",
    songLike: "create_song_like",
    deleteSongLike: "delete_song_like",
  },
};
