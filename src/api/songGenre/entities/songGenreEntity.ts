import {string} from 'yup';

export interface SongGenreEntity {
  id: number;
  name: string;
  coverImage: string;
}

export interface SongsGenresEntity {
  items: SongGenreEntity[];
  count: number;
}

export interface ISongGenre {
  pk: string;
  sk: string;
  name: string;
  coverImg: string;
}
export interface ISongGenreResponse {
  id: string;
  name: string;
  coverImg: string;
}
