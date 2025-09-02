export interface IResponsePostSignedURLImage {
  put_url: string;
  resource_url: string;
}

export interface IPostSignedURLImage {
  name: string;
  type: string;
  folder: string;
}

export interface IPutFile {
  file: any;
  putUrl: string;
}
