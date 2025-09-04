import { API_BIBLE_BASE, API_MEDIA_BASE_URL } from "@/core/utils/config";

export const apiMediaBase = {
  baseUrl: API_MEDIA_BASE_URL,
  endpoints: {
    resources: "/resources",
  },
};

export const apiBaseBible = {
  baseUrl: API_BIBLE_BASE,
  endpoints: {
    bibles: "/bibles",
  },
};
