import { E_NewsStackRoutes } from "@/news";
import { E_QuizStackRoutes } from "@/quiz";
import { E_SermonStackRoutes } from "@/sermon";
import { E_SongStackRoutes } from "@/song";
import { E_VerseStackRoutes } from "@/verse";

export interface IListButtonEntity {
  id: number;
  title: string;
  route: string;
  color: string;
}

export const listButtonsNavigationExplorer: IListButtonEntity[] = [
  {
    id: 1,
    title: "Songs",
    route: E_SongStackRoutes.SONGS,
    color: "#D9B9B4",
  },
  {
    id: 2,
    title: "Verses",
    route: E_VerseStackRoutes.VERSES,
    color: "#E5DED8",
  },
  {
    id: 3,
    title: "Sermons",
    route: E_SermonStackRoutes.SERMONS,
    color: "#8D9998",
  },
  {
    id: 4,
    title: "Quizzes",
    route: E_QuizStackRoutes.QUIZZES,
    color: "#F7E3C2",
  },
  {
    id: 5,
    title: "News",
    route: E_NewsStackRoutes.NEWS,
    color: "#C8C8D1",
  },
];
