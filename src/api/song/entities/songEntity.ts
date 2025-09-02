import {ArtistEntity} from '@/api/artist/entities/artistEntity';
import {SongGenreEntity} from '@/api/songGenre/entities/songGenreEntity';

export interface SongEntity {
  id: number;
  name: string;
  coverImage: string;
  urlSong: string;
  songGenre: SongGenreEntity;
  artist: ArtistEntity;
  userSongLike: UserSongLikeEntity[];
}

export interface SongsEntity {
  items: SongEntity[];
  count: number;
}
export interface ICreateSongLikeEntity {
  user_id: string | number;
  song_id: number;
}

export interface UserSongLikeEntity {
  id: number;
  song: UserSongEntity;
  user: {id: number};
}

interface UserSongEntity {
  id: number;
  name: string;
}

export interface ISong {
  pk: string;
  sk: string;
  name: string;
  img: string;
  songUrl: string;
  songGenderId: string;
  artistId: string;
  artist: IArtist;
}

export interface ISongResponse {
  id: string;
  name: string;
  img: string;
  songUrl: string;
  songGenderId: string;
  artistId: string;
  artist: IArtist;
}
interface IArtist {
  name: string;
  img: string;
}
