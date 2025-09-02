export interface NewsTypesEntity {
  id: number | string;
  name: string;
  erased?: boolean;
}
export interface INewsType {
  pk: string;
  sk: string;
  name: string;
  erased?: boolean;
}

export interface INewsTypeResponse {
  id: number | string;
  name: string;
  erased?: boolean;
}
