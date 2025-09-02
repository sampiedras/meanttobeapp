import {NewsTypesEntity} from '@/api/typeNews/entities/typeNewsEntity';

export interface NewEntity {
  id: number;
  name: string;
  img: string;
  imgAuthor: string;
  nameAuthor: string;
  newsUrl: string;
  textNews: string;
  newsCategory: NewsTypesEntity;
}

export interface NewsEntity {
  count: number;
  items: NewEntity[];
}

export interface INews {
  pk: string;
  sk: string;
  name: string;
  information: string;
  typeNewsId: string;
  newsUrl: string;
  author: author;
  mediaUrls: string[];
}

export interface INewsResponse {
  id: string;
  name: string;
  information: string;
  typeNewsId: string;
  newsUrl: string;
  author: author;
  mediaUrls: string[];
}

interface author {
  name: string;
  img: string;
}
