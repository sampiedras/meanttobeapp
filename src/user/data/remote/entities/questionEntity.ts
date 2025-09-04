export interface QuestionEntity {
  id: number;
  question: string;
  answer: string;
  userQuestion?: UserQuestion[];
}

export interface UserQuestion {
  questionId: string;
  question: string;
  answer: string;
}

export interface IQuestionEntity {
  pk: string;
  question: string;
  sk: string;
}

export interface IQuestionResponse {
  id: number;
  question: string;
  sk: string;
  answer?: string;
  userQuestion?: UserQuestion[];
}

export type UserQuestionByUserType = {
  pk: string;
  sk: string;
  question: string;
  answer: string;
};
