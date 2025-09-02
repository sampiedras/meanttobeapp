export interface SearchingEntity {
  id: number;
  name: string;
  selected?: boolean;
}

export interface ISearchingEntity {
  pk: string;
  sk: string;
  name: string;
  selected?: boolean;
}


export interface SearchingEntityResponse {
  id: string;
  name: string;
  selected?: boolean;
}