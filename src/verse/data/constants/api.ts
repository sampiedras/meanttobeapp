import { API_VERSE_BASE_URL } from "@/core/utils/config";

export const apiVerseBase = {
  baseUrl: API_VERSE_BASE_URL,
  endpoints: {
    verse: "/verse",
    recentVerse: "/recent_verse",
    typeVerse: "/type_verse",
  },
};
