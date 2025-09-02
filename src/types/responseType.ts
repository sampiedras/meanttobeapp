export type responseType<T> = {
  message?: string;
  data: T;
  error?: boolean;
  count?: number;
};
