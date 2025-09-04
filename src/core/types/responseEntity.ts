export interface ResponseEntity<T> {
  data: T;
  status: number;
  message: string;
}
