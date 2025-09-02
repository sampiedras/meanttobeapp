export interface QuestionEntity {
  id: number;
  question: string;
  answer: string;
  userQuestion?: UserQuestion[];
}

export interface UserQuestion {
  id: number;
  answer: string;
  user?: {id: number};
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
