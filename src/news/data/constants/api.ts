import { API_NEWS_BASE_URL } from "@/core/utils/config";

export const apiNewsBase = {
  baseUrl: API_NEWS_BASE_URL,
  endpoints: {
    news: "/news",
    recentNews: "/recent_news",
    typeNews: "/type_news",
  },
};
