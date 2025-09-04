export type VerseType = {
  pk: string;
  sk: string;
  name: string;
  img: string;
  shareImg: string;
  verseQuote: string;
  typeVerseId: string;
  typeVerse: string;
};

export type VersesType = VerseType[];

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

export interface IVerse {
  pk: string;
  sk: string;
  name: string;
  img: string;
  shareImg: string;
  verseQuote: string;
  typeVerseId: string;
  typeVerse: string;
}

export interface IVerseResponse {
  id: string;
  name: string;
  img: string;
  shareImg: string;
  verseQuote: string;
  typeVerseId: string;
  typeVerse: string;
}
