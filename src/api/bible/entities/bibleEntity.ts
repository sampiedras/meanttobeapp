export interface BooksEntity {
  data?: any;
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

export interface ChapterEntity {
  data?: any;
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  reference: string;
}

export interface VerseEntity {
  data?: any;
  id: string;
  orgId: string;
  bibleId: string;
  bookId: string;
  chapterId: string;
  reference: string;
}

export interface IPassageEntity {
  id: string;
  content: [
    {
      name: string;
    },
    items: [
      {
        name: string;
      },
      {
        text: string;
      },
    ],
  ];
}
