export interface ExplorerRandomEntity {
   items: Array<{
    id: number;
    name: string;
    img?: string;
    textNews?: string;
    newsUrl?: string;
    title?: string;
    description?: string;
    urlYouTube?: string;
    creationDate?: string;
    verseQuote?: string;
    imageShare?: string;
    coverImage?: string;
    urlSong?: string;
    erased: boolean;
    created_at: string;
    updated_at: string;
    type: string;
  }>;
  count: number;
}
