export interface ExplorerRecentAddedEntity {
    items: Array<{
     id: number;
     name: string;
     img?: string;
     newsUrl?: string;
     title?: string;
     urlYouTube?: string;
     verseQuote?: string;
     coverImage?: string;
     urlSong?: string;
     erased: boolean;
     created_at: string;
     updated_at: string;
     type: string;
   }>;
   count: number;
 }
 