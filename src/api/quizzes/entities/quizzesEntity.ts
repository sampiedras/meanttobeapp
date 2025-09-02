export type responseType<T> = {
  message?: string;
  data: T;
  error?: boolean;
  count?: number;
  nextToken?: string;
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

export type QuizQuestionEntity = {
  id: string;
  name: string;
};

export type QuizQuestionResponseEntity = {
  pk: string;
  sk: string;
  name: string;
};

export type QuizAnswersEntity = {
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

export type TagEntity = {
  id: string;
  description: string;
  name: string;
  img: string;
};
export type TagResponseEntity = {
  pk: string;
  sk: string;
  description: string;
  name: string;
  img: string;
};
