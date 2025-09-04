import { API_QUIZ_BASE_URL } from "@/core/utils/config";

export const apiQuizBase = {
  baseUrl: API_QUIZ_BASE_URL,
  endpoints: {
    quiz: "/quiz",
    createQuizLike: "/create_quiz_like",
    deleteQuizLike: "/delete_quiz_like",
    quizByLike: "/quiz_by_like",
    quizFavoriteByUser: "/quiz_favorite_by_user",
    tagTrending: "/tag_trending",
    answer: "/answer",
    tag: "/tag",
    quizQuestion: "/question",
  },
};
