export type SermonType = {
  pk: string;
  sk: string;
  title: string;
  description: string;
  urlYouTube: string;
  creationDate: string;
  typeSermonId: string;
  typeSermon: string;
};

export type SermonsType = SermonType[];

export interface ISermon {
  pk: string;
  sk: string;
  title: string;
  description: string;
  typeSermonId: string;
  typeSermon: string;
  urlYouTube: string;
  creationDate: string;
  isLike?: boolean;
}

export interface ISermonResponse {
  id: string;
  title: string;
  description: string;
  typeSermonId: string;
  typeSermon: string;
  urlYouTube: string;
  creationDate: string;
  isLike?: boolean;
}

export interface ITypeSermon {
  name: string;
  pk: string;
  sk: string;
}

export interface ITypeSermonResponse {
  id: string;
  name: string;
}
