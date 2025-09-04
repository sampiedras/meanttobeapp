export interface GenericResponse<T> {
  action: string;
  data: T;
  count: number;
  message: string;
  error: boolean;
}
