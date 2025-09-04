import { API_SERMON_BASE_URL } from "@/core/utils/config";

export const apiSermonBase = {
  baseUrl: API_SERMON_BASE_URL,
  endpoints: {
    sermon: "/sermon",
    createSermonLike: "/create_sermon_like",
    deleteSermonLike: "/delete_sermon_like",
    sermonByLike: "/sermon_by_like",
    recentSermons: "/recent_sermons",
    sermonFavoriteByUser: "/sermon_favorite_by_user",
    typeSermon: "/type_sermon",
  },
};
