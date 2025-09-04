export interface IArtistResponse {
  id: string;
  name: string;
  img: string;
}
export interface IArtist {
  pk: string;
  sk: string;
  name: string;
  img: string;
  songGenderIds: string[];
}
