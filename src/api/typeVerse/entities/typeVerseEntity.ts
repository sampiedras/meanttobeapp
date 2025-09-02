export interface TypeVerseEntity {
  id: number;
  name: string;
  coverImage: string;
}

export interface TypeVersesEntity {
  items: TypeVerseEntity[];
  count: number;
}

export interface ITypeVerse {
  pk: string;
  sk: string;
  name: string;
  coverImg: string;
}
export interface ITypeVerseResponse {
  id: string;
  name: string;
  coverImg: string;
}
