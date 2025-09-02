import { IListButtonEntity } from '@/interfaces/listButtonEntity';
import {RootStackRoutes} from '@/types/stackRoutes';

export const listButtonsNavigationExplorer: IListButtonEntity[] = [
  {
    id: 1,
    title: 'Songs',
    route: RootStackRoutes.SONGS,
    color: '#D9B9B4',
  },
  {
    id: 2,
    title: 'Verses',
    route: RootStackRoutes.VERSES,
    color: '#E5DED8',
  },
  {
    id: 3,
    title: 'Sermons',
    route: RootStackRoutes.SERMONS,
    color: '#8D9998',
  },
  {
    id: 4,
    title: 'Quizzes',
    route: RootStackRoutes.QUIZZES,
    color: '#F7E3C2',
  },
  {
    id: 5,
    title: 'News',
    route: RootStackRoutes.NEWS,
    color: '#C8C8D1',
  },
];
