export type NewsType = {
  pk: string;
  sk: string;
  name: string;
  information: string;
  mediaUrls: string[];
  newsUrl: string[];
  typeNewsId: string;
  author: {
    name: string;
    img: string;
  };
};

export interface INewsResponse {
  id: string;
  name: string;
  information: string;
  typeNewsId: string;
  typeNews?: string;
  newsUrl: string;
  author: author;
  mediaUrls: string[];
}

interface author {
  name: string;
  img: string;
}

export interface INews {
  pk: string;
  sk: string;
  name: string;
  information: string;
  typeNewsId: string;
  typeNews?: string;
  newsUrl: string;
  author: author;
  mediaUrls: string[];
}

export interface INewsType {
  pk: string;
  sk: string;
  name: string;
  erased?: boolean;
}

export interface INewsTypeResponse {
  id: number | string;
  name: string;
  erased?: boolean;
}
