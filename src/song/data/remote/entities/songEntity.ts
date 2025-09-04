import { IArtist } from "./artistEntity";

export type SongType = {
  pk: string;
  sk: string;
  name: string;
  image?: string;
  img?: string;
  songUrl: string;
  songGenderId: string;
  artistId: string;
  artist: {
    img: string;
    name: string;
  };
};

export type SongsType = SongType[];

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

export interface ISongResponse {
  id: string;
  name: string;
  img: string;
  songUrl: string;
  songGenderId: string;
  artistId: string;
  artist: IArtist;
  isLike?: boolean;
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
  isLike?: boolean;
}
export interface ILikedSong {
  songLikeId: string;
}
