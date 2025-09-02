export interface ArtistEntity {
  id: number;
  name: string;
  imgArtist: string;
}

export interface ArtistsEntity {
  items: ArtistEntity[];
  count: number;
}
export interface IArtist {
  pk: string;
  sk: string;
  name: string;
  img: string;
  songGenderIds: string[];
}
export interface IArtistResponse {
  id: string;
  name: string;
  img: string;
}
