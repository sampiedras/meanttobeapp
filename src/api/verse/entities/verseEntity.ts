import {TypeVersesEntity} from '@/api/typeVerse/entities/TypeVerseEntity';

export interface VerseEntity {
  id: number;
  name: string;
  img: string;
  imageShare: string;
  verseQuote: string;
  typeVerse: TypeVersesEntity;
}

export interface VersesEntity {
  items: VerseEntity[];
  count: number;
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
