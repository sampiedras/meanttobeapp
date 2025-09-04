export type QuizType = {
  pk: string;
  sk: string;
  name: string;
  description: string;
  img: string;
  likeQuiz: string;
};

export type QuizAnswersType = {
  id: string;
  name: string;
  tag: string;
  tagId: string;
};

export type QuizAnswersResponseEntity = {
  pk: string;
  sk: string;
  name: string;
  tag: string;
  tagId: string;
};

export type QuizEntity = {
  id: string;
  description: string;
  name: string;
  img: string;
  isLike: boolean;
};

export type QuizResponseEntity = {
  pk: string;
  sk: string;
  description: string;
  name: string;
  img: string;
  isLike: boolean;
};
