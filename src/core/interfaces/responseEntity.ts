export interface IResponse<T> {
  action: string;
  count: number;
  nextToken: string;
  message: string;
  error: boolean;
  data: T[];
}
export interface IResponseObject<T> {
  action: string;
  count: number;
  nextToken: string;
  message: string;
  error: boolean;
  data: T;
}

export type responseType<T> = {
  message?: string;
  data: T;
  error?: boolean;
  count?: number;
  nextToken?: string;
};
