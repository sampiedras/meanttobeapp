import {TypeSermonEntity} from '@/api/typeSermon/entities/typeSermonEntity';
import {string} from 'yup';

export interface SermonEntity {
  id: number;
  title: string;
  description: string;
  urlYouTube: string;
  creationDate: string;
  sermonType: TypeSermonEntity;
  userSermonLike: UserSermonLikeEntity[];
}

export interface SermonsEntity {
  count: number;
  items: SermonEntity[];
}
export interface TopSermonsEntity {
  sermonId: number;
  title: string;
  description: string;
  urlYouTube: string;
  creationDate: string;
  created_at: string;
  countAlias: string;
}
export interface ICreateSermonLikeEntity {
  user_id: string | number;
  sermon_id: number;
}

export interface UserSermonLikeEntity {
  id: number;
  sermon: UserSermonEntity;
  user: {id: number};
}

interface UserSermonEntity {
  id: number;
  title: string;
}

export interface ISermon {
  pk: string;
  sk: string;
  title: string;
  description: string;
  typeSermonId: string;
  typeSermon: string;
  urlYouTube: string;
  creationDate: string;
}

export interface ISermonResponse {
  id: string;
  title: string;
  description: string;
  typeSermonId: string;
  typeSermon: string;
  urlYouTube: string;
  creationDate: string;
}
